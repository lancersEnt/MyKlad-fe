/* eslint-disable import/no-named-as-default */
import { Box } from '@mui/material';
import Publication from '../../home/feed/Publication';
import PostInput from '../../home/feed/PostInput';
import Post from '../../../utils/Interfaces/Post.Interface';

interface PublicationProps {
  posts: Post[];
}
function Publications({ posts }: PublicationProps) {
  return (
    <Box>
      <PostInput />
      {posts.map((post) => (
        <Publication key={post.id} post={post} />
      ))}
    </Box>
  );
}
export default Publications;
