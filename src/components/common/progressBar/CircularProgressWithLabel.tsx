/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Typography,
} from '@mui/material';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          // variant="caption"
          component="div"
          color="primary"
          fontWeight={700}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
export default CircularProgressWithLabel;
