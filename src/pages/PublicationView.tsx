import { gql, useQuery } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Publication from '../components/home/feed/Publication';

const GET_POST = gql`
  query Post($postId: String!) {
    post(id: $postId) {
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
        profilePictureUrl
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
          profilePictureUrl
        }
        user {
          id
          firstname
          lastname
          username
          profilePictureUrl
        }
      }
      user {
        id
        firstname
        lastname
        username
        profilePictureUrl
      }
    }
  }
`;
function PublicationView() {
  const { postId } = useParams();
  const {
    data: publication,
    loading,
    error,
    refetch,
  } = useQuery(GET_POST, {
    variables: { postId },
  });
  return (
    <Box mb="5rem">
      {loading && 'loading ... '}
      {!loading && error && <h4>{error.message}</h4>}
      {!loading && publication && (
        <Box sx={{ pl: { xs: 0, sm: 0, md: '5rem' }, pt: '5rem' }}>
          <Publication post={publication.post} />
        </Box>
      )}
    </Box>
  );
}

export default PublicationView;
