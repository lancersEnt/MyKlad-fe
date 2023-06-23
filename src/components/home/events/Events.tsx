import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';

export default function Events() {
  return (
    <Box>
      <Typography variant="h6" component="h2" gutterBottom>
        Evenements
      </Typography>
      <Card sx={{ display: 'flex', mb: 3, borderRadius: 3 }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="https://images.unsplash.com/photo-1680208281019-8642d20405f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
          alt="Live from space album cover"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              Live From Spaceazfa azefpazeojfa
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Tunisia
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 2 }}>
            <Stack direction="row" spacing={2}>
              <Typography fontSize={13}>
                {' '}
                <strong>Start</strong> : 01/01/1995
              </Typography>
              <Typography fontSize={13}>
                <strong>end</strong> : 12/12/2059
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Card>
      <Card sx={{ display: 'flex', mb: 3, borderRadius: 3 }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="https://images.unsplash.com/photo-1680208281019-8642d20405f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
          alt="Live from space album cover"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              Live From Spaceazfa azefpazeojfa
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Tunisia
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 2 }}>
            <Stack direction="row" spacing={2}>
              <Typography fontSize={13}>
                {' '}
                <strong>Start</strong> : 01/01/1995
              </Typography>
              <Typography fontSize={13}>
                <strong>end</strong> : 12/12/2059
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
