import { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { useQuery, useSubscription } from '@apollo/client';
import { useParams } from 'react-router-dom';

import PageHeader from '../components/Page/PageHeader';
import PageTabs from '../components/Page/PageTabs';

import {
  POST_LIKE_SUBSCRIPTION,
  POST_SUBSCRIPTION,
  POST_UNLIKE_SUBSCRIPTION,
} from '../utils/GraphQL/Subscriptions';

import { GET_PAGE } from '../utils/GraphQL/Queries';

function Page() {
  const { username } = useParams();
  const {
    data: page,
    loading,
    error,
    refetch,
  } = useQuery(GET_PAGE, {
    variables: { username },
  });

  const { data: postSubData } = useSubscription(POST_SUBSCRIPTION);
  const { data: likeSubData } = useSubscription(POST_LIKE_SUBSCRIPTION);
  const { data: unlikeSubData } = useSubscription(POST_UNLIKE_SUBSCRIPTION);

  useEffect(() => {
    if (postSubData?.postCreated?.newPost) {
      refetch(); // Refetch the posts after a new post is created
    }
    if (likeSubData?.postLiked?.post) {
      refetch(); // Refetch the posts after a new post is created
    }
    if (unlikeSubData?.postLiked?.post) {
      refetch(); // Refetch the posts after a new post is created
    }
  }, [postSubData, likeSubData, unlikeSubData, refetch]);
  return (
    <Box mb="5rem">
      {loading && 'loading ... '}
      {!loading && error && <h4>{error.message}</h4>}
      {!loading && page && (
        <Grid
          container
          spacing={2}
          sx={{ pl: { xs: 0, sm: 0, md: '5rem' }, pt: '5rem' }}
        >
          <Grid
            item
            lg={0.5}
            display={{ xs: 'none', sm: 'none', lg: 'flex' }}
          />
          <Grid item xs={12} sm={12} lg={10.5}>
            <PageHeader page={page.findPageByUsername} refetch={refetch} />
            <PageTabs page={page.findPageByUsername} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
export default Page;
