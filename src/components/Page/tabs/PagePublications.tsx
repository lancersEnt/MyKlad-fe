/* eslint-disable import/no-named-as-default */
import { Box } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Publication from '../../home/feed/Publication';
import PostInput from '../../home/feed/PostInput';
import Post from '../../../utils/Interfaces/Post.Interface';
import { RootState } from '../../../app/store';
import PublicationSkeleton from '../../common/skeletons/PublicationSkeleton';

interface PublicationProps {
  posts: Post[];
}
function PagePublications({ posts }: PublicationProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const { username } = useParams();
  return (
    <Box>
      {user.username === username && <PostInput />}
      {posts.map((post) => (
        <Publication key={post.id} post={post} />
      ))}
    </Box>
  );
}
export default PagePublications;
