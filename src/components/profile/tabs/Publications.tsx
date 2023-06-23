import { Box } from '@mui/material';
import Publication from '../../home/feed/Publication';
import PostInput from '../../common/inputs/PostInput';

function Publications() {
  return (
    <Box>
      <PostInput />
      <Publication />
      <Publication />
      <Publication />
    </Box>
  );
}
export default Publications;
