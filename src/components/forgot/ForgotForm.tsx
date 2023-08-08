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

import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  ChevronLeftRounded,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { gql, useMutation } from '@apollo/client';

import CustomTextField from '../common/inputs/CustomTextField';
import { REQ_RES, RES_PASS } from '../../utils/GraphQL/Mutations';

type FormValues = {
  email: string;
};

type Form2Values = {
  token: string;
  password: string;
};

function ForgotForm(): ReactElement {
  const [reqSent, setReqSent] = useState(false);

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required('email is required')
      .matches(
        /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/i,
        'enter a valid email please'
      ),
  });

  const form2Schema = Yup.object().shape({
    token: Yup.string().required('Le code de reinitialisation est obligatoire'),
    password: Yup.string().required('nouveau mp est obligatoire'),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const form2Options = { resolver: yupResolver(form2Schema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(formOptions);

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm<Form2Values>(form2Options);

  const navigate = useNavigate();

  const [requestReset, { loading, error, data }] = useMutation(REQ_RES, {
    onCompleted(res) {
      if (res.forgotPassword) setReqSent(true);
    },
  });

  const [resetPass, { loading: loading2, error: error2, data: data2 }] =
    useMutation(RES_PASS, {
      onCompleted(res) {
        if (res.forgotPassword) setReqSent(true);
      },
    });

  const onSubmit = handleSubmit(async (formValues) => {
    await requestReset({ variables: { email: formValues.email } });
  });

  const onSubmit2 = handleSubmit2(async (formValues2) => {
    await resetPass({ variables: formValues2 });
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
      {!reqSent && (
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <Typography mx="auto" variant="h5" fontWeight={500}>
              Mot de passe Oublié
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
                  'Envoyer code reinitialisation'
                )}
              </Typography>
            </Button>
            <Typography> {error?.message} </Typography>
          </Stack>
        </form>
      )}

      {reqSent && (
        <form onSubmit={onSubmit2} style={{ position: 'relative' }}>
          <Stack spacing={2}>
            <Stack direction="row">
              <Button
                sx={{ position: 'absolute', left: -25, top: -40 }}
                onClick={() => setReqSent(false)}
              >
                <ChevronLeftRounded />
              </Button>
            </Stack>
            <Typography
              mx="auto"
              textAlign="center"
              variant="h5"
              fontWeight={500}
            >
              Réinitialisation de mot de passe
            </Typography>{' '}
            <CustomTextField
              InputProps={{ disableUnderline: true }}
              variant="filled"
              label="Code réinitialisation"
              sx={{
                border: errors2.token?.message ? '1px solid #d32f2f' : 'none',
              }}
              {...register2('token')}
            />
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
                borderBottom: '2px solid #d32f2f',
              }}
              variant="filled"
              type={showPassword ? 'text' : 'password'}
              label="Nouveau Mot de passe"
              {...register2('password')}
            />
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
                  'Réinitialiser votre mot de passe'
                )}
              </Typography>
            </Button>
          </Stack>
        </form>
      )}
    </Box>
  );
}

export default ForgotForm;
