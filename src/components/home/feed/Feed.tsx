import { Box, Typography } from '@mui/material';
import { gql, useQuery, useSubscription } from '@apollo/client';
import { useEffect } from 'react';
import PostInput from './PostInput';

// Interfaces
import Post from '../../../utils/Interfaces/Post.Interface';
import Publication from './Publication';

const GET_POSTS = gql`
  query Posts {
    posts {
      id
      authorId
      content
      createdAt
      imageUrl
      likersIds
      likers {
        id
        firstname
        lastname
        username
      }
      comments {
        id
        content
        likersIds
        likers {
          id
          firstname
          lastname
          username
        }
        user {
          id
          firstname
          lastname
          username
        }
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

const POST_LIKE_SUBSCRIPTION = gql`
  subscription Subscription {
    postLiked {
      post {
        id
      }
    }
  }
`;

const POST_UNLIKE_SUBSCRIPTION = gql`
  subscription Subscription {
    postUnliked {
      post {
        id
      }
    }
  }
`;

export default function Feed() {
  const { loading, error, data, refetch } = useQuery(GET_POSTS);
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
