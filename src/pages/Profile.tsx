import { Box, Grid } from '@mui/material';
import { gql, useQuery, useSubscription } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { useEffect } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabs from '../components/profile/ProfileTabs';

const GET_USER = gql`
  query Query($username: String!) {
    findByUsername(username: $username) {
      id
      firstname
      lastname
      permissions
      username
      email
      profilePictureUrl
      followers {
        firstname
        lastname
        username
        profilePictureUrl
        email
      }
      following {
        firstname
        lastname
        profilePictureUrl
        username
        email
      }
      posts {
        id
        authorId
        content
        createdAt
        imageUrl
        likersIds
        subscribers {
          id
          firstname
          lastname
        }
        likers {
          id
          firstname
          lastname
          profilePictureUrl
          username
        }
        comments {
          id
          content
          user {
            id
            username
            firstname
            lastname
            profilePictureUrl
            username
          }
          likersIds
          likers {
            id
            firstname
            lastname
            profilePictureUrl
            username
          }
        }
        user {
          id
          username
          firstname
          profilePictureUrl
          lastname
        }
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
          username
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
function Profile() {
  const { username } = useParams();
  const {
    data: user,
    loading,
    error,
    refetch,
  } = useQuery(GET_USER, {
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
      {!loading && user && (
        <Grid
          container
          spacing={2}
          sx={{ pl: { xs: 0, sm: 0, md: '5rem' }, pt: '5rem' }}
        >
          <Grid item lg={2} display={{ xs: 'none', sm: 'none', lg: 'flex' }} />
          <Grid item xs={12} sm={12} lg={8}>
            <ProfileHeader user={user.findByUsername} refetch={refetch} />
            <ProfileTabs user={user.findByUsername} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
export default Profile;
