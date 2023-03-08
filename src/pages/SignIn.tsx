import { Box, Grid, Stack, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import SigninForm from '../components/signin/SignInForm';

function SignIn() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ flexGrow: 1, my: 'auto', minHeight: '100vh' }}
    >
      <Grid style={{ height: '100%' }} container spacing={2}>
        <Grid item lg={6}>
          <Box sx={{ ml: 'auto', mr: 'auto' }} maxWidth="450px">
            <Stack spacing={2}>
              <Typography variant="h4" component="h1">
                MyKlad
              </Typography>
              <Typography variant="h5" component="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse sem ligula.
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
        </Grid>
        <Grid item lg={6}>
          <SigninForm />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SignIn;
