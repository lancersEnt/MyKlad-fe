/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

const ACC_ACTIVATION = gql`
  mutation activateAccount($activationToken: String!) {
    activateUserAccount(activationToken: $activationToken) {
      id
      email
    }
  }
`;

function AccountActivation() {
  const navigate = useNavigate();

  const { token } = useParams();
  const [progress, setProgress] = useState(20);

  const [activateAccount, { loading, error, data }] =
    useMutation(ACC_ACTIVATION);

  useEffect(() => {
    activateAccount({ variables: { activationToken: token } });
    setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 20
      );
    }, 1000);
    setInterval(() => {
      navigate('/signin');
    }, 5000);
  }, []);
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
          <Box
            py="3rem"
            px={{ md: '3rem', sm: '2rem', xs: '1rem' }}
            boxShadow="3"
            sx={{
              ml: 'auto',
              mr: 'auto',
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              maxWidth: '700px',
            }}
          >
            <Typography
              textAlign="center"
              mx="auto"
              variant="h5"
              fontWeight={300}
            >
              Compte Activée, vous serez redirigé vers la page de connexion dans
              5 secondes
            </Typography>
            <CircularProgress variant="determinate" value={progress} />
          </Box>
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

export default AccountActivation;
