/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, MouseEvent, ReactElement } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';

import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { gql, useMutation } from '@apollo/client';

import { ReactComponent as Google } from '../../assets/social logos/google.svg';
import { ReactComponent as Facebook } from '../../assets/social logos/facebook.svg';

import CustomTextField from '../common/inputs/CustomTextField';

type FormValues = {
  email: string;
  password: string;
};

const SIGN_IN = gql`
  mutation Login($user: LoginUserInput!) {
    login(user: $user) {
      token
      user {
        id
        firstname
        lastname
        username
        email
        followers {
          id
          firstname
          lastname
        }
      }
    }
  }
`;

function SigninForm(): ReactElement {
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required('email is required')
      .matches(
        /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/i,
        'enter a valid email please'
      ),
    password: Yup.string().required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(formOptions);

  const navigate = useNavigate();

  const [signin, { loading, error, data }] = useMutation(SIGN_IN, {
    onCompleted(res) {
      if (res.login) navigate('/');
    },
  });

  const onSubmit = handleSubmit(async (formValues) => {
    await signin({ variables: { user: formValues } });
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      py="3rem"
      px={{ md: '3rem', sm: '2rem', xs: '1rem' }}
      boxShadow="3"
      ml={{ md: '0px', sm: 'auto', xs: 'auto' }}
      sx={{
        mr: 'auto',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        maxWidth: '400px',
      }}
    >
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <Typography mx="auto" variant="h5" fontWeight={500}>
            Identifiez-vous
          </Typography>
          <CustomTextField
            InputProps={{ disableUnderline: true }}
            variant="filled"
            label="Email"
            sx={{
              border: errors.email?.message ? '1px solid #d32f2f' : 'none',
            }}
            {...register('email')}
          />
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
          <CustomTextField
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
            sx={{
              border: errors.password?.message ? '1px solid #d32f2f' : 'none',
            }}
            variant="filled"
            type={showPassword ? 'text' : 'password'}
            label="Mot de passe"
            {...register('password')}
          />
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
          <Typography
            color="primary"
            fontSize="12px"
            textAlign="right"
            variant="caption"
            sx={{ marginTop: '.25rem !important' }}
          >
            {' '}
            Mot de passe oublié ?
          </Typography>
          <Button
            size="large"
            sx={{ borderRadius: '50px', textTransform: 'unset' }}
            variant="contained"
            type="submit"
          >
            <Typography py=".5rem" fontSize=".8rem">
              {loading ? (
                <CircularProgress color="inherit" size="1.125rem" />
              ) : (
                'Connexion'
              )}
            </Typography>
          </Button>
          <Typography> {error?.message} </Typography>
          <Divider sx={{ fontSize: '1rem', fontWeight: '500', color: 'grey' }}>
            {'   '}OU
          </Divider>
          <Button
            size="large"
            style={{
              borderRadius: '50px',
              textTransform: 'unset',
            }}
            variant="outlined"
            color="secondary"
          >
            <Stack direction="row" spacing={2}>
              <Google />
              <Typography color="black" fontSize=".8rem" lineHeight={2}>
                Se connecter avec Google
              </Typography>
            </Stack>
          </Button>
          <Button
            size="large"
            style={{ borderRadius: '50px', textTransform: 'unset' }}
            variant="outlined"
            color="secondary"
          >
            <Stack direction="row" spacing={2}>
              <Facebook />
              <Typography color="black" fontSize=".8rem" lineHeight={2}>
                Se connecter avec Facebook
              </Typography>
            </Stack>
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default SigninForm;
