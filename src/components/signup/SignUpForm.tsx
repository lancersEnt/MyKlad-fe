/* eslint-disable react/jsx-props-no-spreading */
import { useState, MouseEvent, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { gql, useMutation } from '@apollo/client';
import CustomTextField from '../common/inputs/CustomTextField';
import CustomSelectField from '../common/inputs/CustomSelectField';

type FormValues = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  sex: string;
};

const SIGNUP = gql`
  mutation signup($createUserInput: CreateUserInput!) {
    signup(createUserInput: $createUserInput) {
      id
      email
    }
  }
`;

function SignUpForm(): ReactElement {
  const formSchema = Yup.object().shape({
    firstname: Yup.string().required('champ prenom est obligatoire'),
    lastname: Yup.string().required('champ nom est obligatoire'),
    username: Yup.string().required("champ nom d'utilisateur est obligatoire"),
    email: Yup.string().required('Champ email est obligatoire'),
    password: Yup.string().required('Champ mot de passe est obligatoire'),
    dateOfBirth: Yup.date().required('champ date est obligatoire'),
    sex: Yup.string().required('champ genre est obligatoire'),
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

  const [signup, { loading, error, data }] = useMutation(SIGNUP, {
    onCompleted() {
      setSignedUp(true);
      reset();
    },
  });

  const onSubmit = handleSubmit(async (formValues) => {
    await signup({
      variables: { createUserInput: { ...formValues, permissions: ['user'] } },
    });
  });

  return (
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
        <Typography textAlign="center" mx="auto" variant="h5" fontWeight={300}>
          Un email de vérification est en cours d&apos;envoi. <br />
          Consultez votre boîte de réception pour activer votre compte. <br />
          Vérifiez les spams si vous ne trouvez pas l&apos;e-mail ou demandez un
          autre lien de vérification.
        </Typography>
      ) : (
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <Typography mx="auto" variant="h5" fontWeight={500}>
              Inscrivez-vous
            </Typography>
            {/* Input Prenom  */}
            <Box>
              <CustomTextField
                InputProps={{ disableUnderline: true }}
                variant="filled"
                label="Prenom"
                sx={{
                  border: errors?.firstname ? '1px solid #d32f2f' : 'none',
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

            {/* input Nom */}
            <Box>
              <CustomTextField
                InputProps={{ disableUnderline: true }}
                variant="filled"
                sx={{ border: errors?.lastname ? '1px solid #d32f2f' : 'none' }}
                label="nom"
                fullWidth
                {...register('lastname')}
              />
              {errors?.lastname && (
                <Typography
                  display={errors.lastname?.message ? 'block' : 'none'}
                  sx={{
                    color: '#d32f2f',
                    marginTop: '0 !important',
                  }}
                  variant="caption"
                >
                  {errors.lastname?.message}
                </Typography>
              )}
            </Box>

            {/* Input username  */}
            <Box>
              <CustomTextField
                InputProps={{ disableUnderline: true }}
                variant="filled"
                label="Username"
                sx={{ border: errors?.username ? '1px solid #d32f2f' : 'none' }}
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
                sx={{ border: errors?.email ? '1px solid #d32f2f' : 'none' }}
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
                sx={{ border: errors?.password ? '1px solid #d32f2f' : 'none' }}
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
            {/* Input DOB */}
            <Box>
              <CustomTextField
                sx={{
                  border: errors?.dateOfBirth ? '1px solid #d32f2f' : 'none',
                }}
                InputProps={{ disableUnderline: true }}
                variant="filled"
                label="Date de naissance"
                type="date"
                defaultValue={new Date().toISOString().slice(0, 10)}
                fullWidth
                {...register('dateOfBirth')}
              />
              {errors?.dateOfBirth && (
                <Typography
                  display={errors.dateOfBirth?.message ? 'block' : 'none'}
                  sx={{
                    color: '#d32f2f',
                    marginTop: '0 !important',
                  }}
                  variant="caption"
                >
                  {errors.dateOfBirth?.message}
                </Typography>
              )}
            </Box>
            {/* Input Sex */}
            <FormControl
              sx={{
                m: 1,
                borderRadius: 3,
                border: 'none',
              }}
              variant="filled"
              fullWidth
            >
              <InputLabel id="sex">Genre</InputLabel>
              <CustomSelectField
                sx={{
                  borderRadius: 3,
                  border: errors?.sex ? '1px solid #d32f2f' : 'none',
                }}
                disableUnderline
                labelId="sex"
                id="sex-select"
                label="Genre"
                {...register('sex')}
                variant="filled"
                defaultValue=""
              >
                <MenuItem value="male">Mâle</MenuItem>
                <MenuItem value="female">Femelle</MenuItem>
              </CustomSelectField>
              {errors?.sex && (
                <Typography
                  display={errors.sex?.message ? 'block' : 'none'}
                  sx={{
                    color: '#d32f2f',
                    marginTop: '0 !important',
                  }}
                  variant="caption"
                >
                  {errors.sex?.message}
                </Typography>
              )}
            </FormControl>

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
  );
}

export default SignUpForm;
