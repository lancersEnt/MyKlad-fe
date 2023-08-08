/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import { Box, Stack, Typography } from '@mui/material';
import { gql, useLazyQuery, useQuery, useSubscription } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { closeSnackbar, enqueueSnackbar } from 'notistack';
import PostInput from './PostInput';

// Interfaces
import Post from '../../../utils/Interfaces/Post.Interface';
import Publication from './Publication';
import PublicationSkeleton from '../../common/skeletons/PublicationSkeleton';
import { FEED, GET_POST } from '../../../utils/GraphQL/Queries';
import { POST_SUBSCRIPTION } from '../../../utils/GraphQL/Subscriptions';

function isElementNotInView(element: HTMLElement) {
  const elementRect = element.getBoundingClientRect();
  const viewHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;

  // Check if the element is outside the viewport in any direction
  return (
    elementRect.bottom < 0 || // Element is above the viewport
    elementRect.top > viewHeight || // Element is below the viewport
    elementRect.right < 0 || // Element is to the left of the viewport
    elementRect.left > viewWidth // Element is to the right of the viewport
  );
}

export default function Feed() {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<any[]>([]);
  const [postF, setPostF] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);

  const { loading, error, data, fetchMore, refetch } = useQuery(FEED, {
    variables: { page },
  });

  const [getPost, { refetch: refetchPost }] = useLazyQuery(GET_POST);

  const { data: postSubData } = useSubscription(POST_SUBSCRIPTION);

  useEffect(() => {
    if (postSubData?.postCreated?.newPost) {
      if (postF) {
        refetchPost({ postId: postSubData?.postCreated?.newPost.id });
      } else
        getPost({
          variables: { postId: postSubData?.postCreated?.newPost.id },
          onCompleted(res) {
            setPostF(true);
            setPosts([res.post, ...posts]);
            const postInput = document.getElementById('post-input');
            if (postInput) {
              const elementNotInView = isElementNotInView(postInput);
              if (elementNotInView) {
                enqueueSnackbar(
                  <Box>
                    <Stack
                      direction="row"
                      spacing={2}
                      display="flex"
                      alignContent="center"
                    >
                      <Typography fontFamily="Ubuntu">
                        nouvelle actualité disponible
                      </Typography>
                    </Stack>
                  </Box>,
                  {
                    // key: ,
                    variant: 'success',
                    anchorOrigin: { horizontal: 'center', vertical: 'top' },
                    SnackbarProps: {
                      onClick: () => {
                        window.scrollTo({
                          top: 150,
                          behavior: 'smooth',
                        });
                        closeSnackbar();
                      },
                      style: {},
                    },
                    hideIconVariant: true,
                    autoHideDuration: 10000,
                  }
                );
              }
            }
          },
        });
    }
  }, [postSubData]);

  // Handle fetching more data when the user scrolls down
  const fetchMoreData = async () => {
    if (data && data.feed && data.feed.posts.length > 0) {
      await fetchMore({
        variables: { page: page + 1 }, // Fetch data for the next page
        updateQuery: (prev, { fetchMoreResult }) => {
          // if (!fetchMoreResult) return prev;
          setPosts([...posts, ...fetchMoreResult.feed.posts]);
        },
      });
      setPage(page + 1); // Increment the page number
    }
  };

  if (
    data &&
    data.feed &&
    data.feed.posts &&
    data.feed.posts.length > 0 &&
    posts.length === 0 &&
    page === 0
  ) {
    setPosts(data.feed.posts);
  }
  return (
    <Box pb="5rem" id="feed">
      <Typography variant="h6" component="h2" gutterBottom>
        Publications
      </Typography>
      <PostInput />
      {loading &&
        posts.length === 0 &&
        [1, 2, 3, 4].map((index) => <PublicationSkeleton key={index} />)}
      {!loading && error && <Typography>{JSON.stringify(error)}</Typography>}
      {posts.length > 0 && (
        <InfiniteScroll
          dataLength={posts.length} // This is important field to render the next data
          next={() => {
            fetchMoreData();
          }}
          hasMore={data && data.feed && data.feed.count > page + 1}
          loader={<PublicationSkeleton />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>il n&apos;y a plus de publications</b>
            </p>
          }
          // below props only if you need pull down functionality
          refreshFunction={() => {
            setPage(0);
            refetch({ page });
          }}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
          }
        >
          {posts.length > 0 &&
            posts.map((post: Post) => (
              <Publication key={post.id} post={post} />
            ))}
        </InfiniteScroll>
      )}
    </Box>
  );
}
