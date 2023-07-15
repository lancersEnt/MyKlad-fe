import { Box, Typography } from '@mui/material';
import { gql, useQuery, useSubscription } from '@apollo/client';
import { useEffect } from 'react';
import Publication from './Publication';
import PostInput from './PostInput';

// Interfaces
import Post from '../../../utils/Interfaces/Post.Interface';

const GET_POSTS = gql`
  query Posts {
    posts {
      id
      content
      createdAt
      comments {
        id
        authorId
      }
      user {
        id
        firstname
        lastname
      }
    }
  }
`;

const POST_SUBSCRIPTION = gql`
  subscription Subscription {
    postCreated {
      newPost {
        id
        user {
          id
        }
      }
    }
  }
`;

export default function Feed() {
  const { loading, error, data, refetch } = useQuery(GET_POSTS);
  const { data: subData, loading: subLoading } =
    useSubscription(POST_SUBSCRIPTION);

  useEffect(() => {
    if (subData?.postCreated?.newPost) {
      console.log('new post created');
      refetch(); // Refetch the posts after a new post is created
    }
  }, [subData, refetch]);
  return (
    <Box pb="5rem">
      <Typography variant="h6" component="h2" gutterBottom>
        Publications
      </Typography>
      <PostInput />
      {data?.posts &&
        data.posts.map((post: Post) => (
          <Publication key={post.id} post={post} />
        ))}
    </Box>
  );
}
