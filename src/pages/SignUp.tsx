import { Link } from 'react-router-dom';
import { Box, Grid, Stack, Typography } from '@mui/material';
import SignUpForm from '../components/signup/SignUpForm';

function SignUp() {
  return (
    <Grid
      container
      my="3rem"
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid style={{ height: '100%' }} container>
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          px={{ md: '3rem', sm: '2rem', xs: '1rem' }}
        >
          <Box
            ml="auto"
            mr="auto"
            mb="1rem"
            maxWidth="700px"
            textAlign="center"
          >
            <Stack direction="row" justifyContent="center" alignItems="center">
              <img src="/MyKladIcon.png" alt="MyKlad" width="150px" />
              <Typography
                variant="h4"
                component="h1"
                fontWeight={500}
                display={{ sm: 'block', xs: 'none' }}
              >
                MyKlad
              </Typography>
            </Stack>
          </Box>
          <SignUpForm />
          <Typography
            ml="auto"
            mr="auto"
            maxWidth="700px"
            fontSize="0.8rem"
            mt="0.5rem"
            textAlign="center"
          >
            Vous avez déjà un compte?{' '}
            <Link to="/signin">
              <Typography
                component="span"
                fontSize="0.8rem"
                fontWeight={600}
                color="primary"
                sx={{ display: 'inline-block', textDecoration: 'underline' }}
              >
                Se connecter
              </Typography>
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SignUp;
