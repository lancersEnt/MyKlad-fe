import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import MyKladSignIn from '../components/signin/MyKladSignIn';
import SigninForm from '../components/signin/SignInForm';

function SignIn() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid style={{ height: '100%' }} container spacing={2}>
        <Grid item md={6} sm={12} xs={12}>
          <MyKladSignIn />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <SigninForm />
          <Typography
            ml={{ md: '0px', sm: 'auto', xs: 'auto' }}
            mr="auto"
            maxWidth="400px"
            fontSize="0.8rem"
            mt="0.5rem"
            textAlign="center"
          >
            Vous n&apos;avez pas de compte?{' '}
            <Link to="/signup">
              <Typography
                component="span"
                fontSize="0.8rem"
                fontWeight={600}
                color="primary"
                sx={{ display: 'inline-block', textDecoration: 'underline' }}
              >
                Créer un compte
              </Typography>
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SignIn;
