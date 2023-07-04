import { Box } from '@mui/material';
import { gql, useQuery } from '@apollo/client';
import Publication from '../../home/feed/Publication';
import PostInput from '../../home/feed/PostInput';
import Post from '../../../utils/Interfaces/Post.Interface';

const GET_USER_POSTS = gql`
  query UserPosts($userPostsId: String!) {
    userPosts(id: $userPostsId) {
      id
      content
      createdAt
      updatedAt
    }
  }
`;
function Publications() {
  const { loading, error, data } = useQuery(GET_USER_POSTS);

  return (
    <Box>
      <PostInput />
      {data?.posts &&
        data.posts.map((post: Post) => (
          <Publication key={post.id} post={post} />
        ))}
    </Box>
  );
}
export default Publications;
