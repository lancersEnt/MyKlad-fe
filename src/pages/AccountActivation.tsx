/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from 'react-router-dom';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';

const ACC_ACTIVATION = gql`
  mutation activateAccount($activationToken: String!) {
    activateUserAccount(activationToken: $activationToken) {
      id
      email
    }
  }
`;

function AccountActivation() {
  const { token } = useParams();
  const [activateAccount, { loading, error, data }] =
    useMutation(ACC_ACTIVATION);
  useEffect(() => {
    activateAccount({ variables: { activationToken: token } });
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
              Compte Activée : {token}
            </Typography>
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
