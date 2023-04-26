import { Box, Typography } from '@mui/material';
import Publication from './Publication';

export default function Feed() {
  return (
    <Box pb="5rem">
      <Typography variant="h6" component="h2" gutterBottom>
        Publications
      </Typography>
      <Publication />
      <Publication />
      <Publication />
    </Box>
  );
}
