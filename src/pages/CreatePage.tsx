/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */
import { MouseEvent, ReactElement, useState } from 'react';
import {
  Box,
  Grid,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import moment from 'moment';
import { gql, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../components/common/inputs/CustomTextField';
import { RootState } from '../app/store';
import { ADD_PAGE } from '../utils/GraphQL/Mutations';

type FormValues = {
  firstname: string;
  username: string;
  email: string;
  password: string;
};

function createPage(): ReactElement {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(20);
  const formSchema = Yup.object().shape({
    firstname: Yup.string().required('champ prenom est obligatoire'),
    username: Yup.string().required("champ nom d'utilisateur est obligatoire"),
    email: Yup.string().required('Champ email est obligatoire'),
    password: Yup.string().required('Champ mot de passe est obligatoire'),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const [signedUp, setSignedUp] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(formOptions);

  const [addPage] = useMutation(ADD_PAGE, {
    onCompleted() {
      setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 0 : prevProgress + 20
        );
      }, 1000);
      setInterval(() => {
        navigate('/', { preventScrollReset: false });
      }, 5000);
      setSignedUp(true);
      reset();
    },
  });

  const onSubmit = handleSubmit(async (formValues) => {
    await addPage({
      variables: { createUserInput: { ...formValues }, ownerId: user.id },
    });
  });

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
            {signedUp ? (
              <Typography
                textAlign="center"
                mx="auto"
                variant="h5"
                fontWeight={300}
              >
                Page créer avec succes, vous serez redirigé vers la page
                d&apos;acceuil dans 5 secondes <br />
                <CircularProgress variant="determinate" value={progress} />
              </Typography>
            ) : (
              <form onSubmit={onSubmit}>
                <Typography
                  textAlign="center"
                  gutterBottom
                  variant="h5"
                  fontWeight={500}
                >
                  Inscrivez-vous
                </Typography>
                <Stack spacing={2}>
                  {/* Input Prenom  */}
                  <Box>
                    <CustomTextField
                      InputProps={{ disableUnderline: true }}
                      variant="filled"
                      label="Nom du page"
                      sx={{
                        border: errors?.firstname
                          ? '1px solid #d32f2f'
                          : 'none',
                      }}
                      fullWidth
                      {...register('firstname')}
                    />
                    {errors?.firstname && (
                      <Typography
                        display={errors.firstname?.message ? 'block' : 'none'}
                        sx={{
                          color: '#d32f2f',
                          marginTop: '0 !important',
                        }}
                        variant="caption"
                      >
                        {errors.firstname?.message}
                      </Typography>
                    )}
                  </Box>

                  {/* Input username  */}
                  <Box>
                    <CustomTextField
                      InputProps={{ disableUnderline: true }}
                      variant="filled"
                      label="Username"
                      sx={{
                        border: errors?.username ? '1px solid #d32f2f' : 'none',
                      }}
                      fullWidth
                      {...register('username')}
                    />
                    {errors?.username && (
                      <Typography
                        display={errors.username?.message ? 'block' : 'none'}
                        sx={{
                          color: '#d32f2f',
                          marginTop: '0 !important',
                        }}
                        variant="caption"
                      >
                        {errors.username?.message}
                      </Typography>
                    )}
                  </Box>
                  {/* Input Email */}
                  <Box>
                    <CustomTextField
                      InputProps={{ disableUnderline: true }}
                      sx={{
                        border: errors?.email ? '1px solid #d32f2f' : 'none',
                      }}
                      variant="filled"
                      label="Email"
                      fullWidth
                      {...register('email')}
                    />
                    {errors?.email && (
                      <Typography
                        display={errors.email?.message ? 'block' : 'none'}
                        sx={{
                          color: '#d32f2f',
                          marginTop: '0 !important',
                        }}
                        variant="caption"
                      >
                        {errors.email?.message}
                      </Typography>
                    )}
                  </Box>
                  {/* Input Password */}
                  <Box>
                    <CustomTextField
                      sx={{
                        border: errors?.password ? '1px solid #d32f2f' : 'none',
                      }}
                      InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOffOutlined />
                              ) : (
                                <VisibilityOutlined />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      variant="filled"
                      type={showPassword ? 'text' : 'password'}
                      label="Mot de passe"
                      fullWidth
                      {...register('password')}
                    />
                    {errors?.password && (
                      <Typography
                        display={errors.password?.message ? 'block' : 'none'}
                        sx={{
                          color: '#d32f2f',
                          marginTop: '0 !important',
                        }}
                        variant="caption"
                      >
                        {errors.password?.message}
                      </Typography>
                    )}
                  </Box>

                  {/* submit */}
                  <Button
                    size="large"
                    sx={{ borderRadius: '50px', textTransform: 'unset' }}
                    variant="contained"
                    type="submit"
                  >
                    <Typography py=".5rem" fontSize=".8rem">
                      S&apos;inscrire
                    </Typography>
                  </Button>
                </Stack>
              </form>
            )}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default createPage;
