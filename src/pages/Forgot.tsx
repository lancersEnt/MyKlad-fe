import { Link } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';

import MyKladSignIn from '../components/signin/MyKladSignIn';
import ForgotForm from '../components/forgot/ForgotForm';

function Forgot() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid
        container
        style={{ height: '100%' }}
        spacing={{ md: 2, sm: 0, xs: 0 }}
      >
        <Grid
          item
          md={6}
          sm={12}
          xs={12}
          px={{ md: '3rem', sm: '2rem', xs: '1rem' }}
        >
          <MyKladSignIn />
        </Grid>
        <Grid
          item
          md={6}
          sm={12}
          xs={12}
          px={{ md: '3rem', sm: '2rem', xs: '1rem' }}
          sx={{ my: 'auto' }}
        >
          <ForgotForm />
          <Typography
            ml={{ md: '0px', sm: 'auto', xs: 'auto' }}
            mr="auto"
            maxWidth="400px"
            fontSize="0.8rem"
            mt="0.5rem"
            textAlign="center"
          >
            Vous avez retrouvé votre mot de passe?{' '}
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

export default Forgot;
