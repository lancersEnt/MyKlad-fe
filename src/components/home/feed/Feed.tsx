import { Box, Typography } from '@mui/material';
import { gql, useQuery } from '@apollo/client';
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

export default function Feed() {
  const { loading, error, data } = useQuery(GET_POSTS);

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
