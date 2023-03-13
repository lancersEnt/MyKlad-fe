import { Box, Stack, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

function MyKladSignIn() {
  return (
    <Box
      mr={{ md: '0px', sm: 'auto', xs: 'auto' }}
      sx={{ ml: 'auto' }}
      maxWidth="400px"
      display={{ xs: 'none', sm: 'block' }}
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <img src="/MyKladIcon.png" alt="MyKlad Icon" width="70px" />
          <Typography
            variant="h4"
            component="h1"
            fontWeight={500}
            lineHeight={2}
          >
            MyKlad
          </Typography>
        </Stack>
        <Typography variant="h5" component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          sem ligula.
        </Typography>
        <Box p="2rem">
          <Stack spacing={2}>
            <Typography>
              <DoneIcon
                color="primary"
                sx={{
                  padding: '0.1rem',
                  fontSize: '1rem',
                  bgcolor: '#D7DEF5',
                  borderRadius: '50%',
                  marginRight: '0.5rem',
                }}
              />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              consectetur adipiscing elit.
            </Typography>
            <Typography>
              <DoneIcon
                color="primary"
                sx={{
                  padding: '0.1rem',
                  fontSize: '1rem',
                  bgcolor: '#D7DEF5',
                  borderRadius: '50%',
                  marginRight: '0.5rem',
                }}
              />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              consectetur adipiscing elit.
            </Typography>
            <Typography>
              <DoneIcon
                color="primary"
                sx={{
                  padding: '0.1rem',
                  fontSize: '1rem',
                  bgcolor: '#D7DEF5',
                  borderRadius: '50%',
                  marginRight: '0.5rem',
                }}
              />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              consectetur adipiscing elit.
            </Typography>
            <Typography>
              <DoneIcon
                color="primary"
                sx={{
                  padding: '0.1rem',
                  fontSize: '1rem',
                  bgcolor: '#D7DEF5',
                  borderRadius: '50%',
                  marginRight: '0.5rem',
                }}
              />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              consectetur adipiscing elit.
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
export default MyKladSignIn;
