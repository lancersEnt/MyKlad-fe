/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
import { MouseEvent, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';

import { useMutation } from '@apollo/client';
import CustomTextField from '../common/inputs/CustomTextField';
import { UPDATE_PASSWORD } from '../../utils/GraphQL/Mutations';

export const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 5,
}));

type FormValues = {
  oldPassword: string;
  password: string;
};

function SecurityTab(): ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const [response, setResponse] = useState('');
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const [passwordScore, setPasswordScore] = useState(0);
  const [passwordReccomendation, setPasswordRecommendation] = useState({
    length: false,
    lowerCase: false,
    upperCase: false,
    number: false,
    specialChar: false,
  });

  const handleChange = (val: string) => {
    // Initialize the recommendations to false
    const newRecommendation = {
      length: false,
      lowerCase: false,
      upperCase: false,
      number: false,
      specialChar: false,
    };

    // Check for length
    if (val.length >= 8) {
      newRecommendation.length = true;
    }

    // Check for lowercase letter
    if (/[a-z]/.test(val)) {
      newRecommendation.lowerCase = true;
    }

    // Check for uppercase letter
    if (/[A-Z]/.test(val)) {
      newRecommendation.upperCase = true;
    }

    // Check for special character
    if (/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(val)) {
      newRecommendation.specialChar = true;
    }

    // Check for number
    if (/\d/.test(val)) {
      newRecommendation.number = true;
    }

    // Update the state with the new recommendations
    setPasswordRecommendation(newRecommendation);
    const trueCount = Object.values(newRecommendation).reduce(
      (count, value) => {
        return count + (value ? 1 : 0);
      },
      0
    );
    setPasswordScore(trueCount * 20);
  };

  const formSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Ancien Mot de passe requis'),
    password: Yup.string()
      .required('Mot de passe requis')
      .min(8, 'Le mot de passe doit comporter au moins 8 caractères')
      .matches(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
        'Le mot de passe doit contenir au moins un chiffre, une lettre majuscule et un caractère spécial.'
      ),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>(formOptions);

  const [changePassword] = useMutation(UPDATE_PASSWORD);

  const onSubmit = handleSubmit(async (formValues) => {
    await changePassword({
      variables: {
        updatePasswordInput: { ...formValues },
      },
      onCompleted(res) {
        setResponse(res.updatePassword);
        setPasswordScore(0);
        setPasswordRecommendation({
          length: false,
          lowerCase: false,
          upperCase: false,
          number: false,
          specialChar: false,
        });
        reset();
      },
    });
  });

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Typography
          component="h2"
          variant="h5"
          fontSize={18}
          fontWeight={500}
          py="1rem"
          gutterBottom
        >
          Sécurité et connexion
        </Typography>
        <Typography
          component="h2"
          variant="h5"
          fontSize={14}
          fontWeight={500}
          py="1rem"
        >
          Changement de mot de passe
        </Typography>
        <Box>
          <Stack spacing={2}>
            <CustomTextField
              fullWidth
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
              label="Mot de passe actuel"
              {...register('oldPassword')}
            />
            <CustomTextField
              fullWidth
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
              label="Nouveau mot de pass"
              {...register('password', {
                onChange: (e) => {
                  handleChange(e.target.value); // Your custom change handler
                  // Additional actions you want to perform on input change
                },
              })}
            />
            {errors.password && (
              <Box sx={{ m: '0 !important', px: 4 }}>
                <Typography color="error" variant="caption">
                  {errors.password?.message}
                </Typography>
              </Box>
            )}
            {isDirty && (
              <>
                <BorderLinearProgress
                  color={
                    passwordScore === 100
                      ? 'success'
                      : passwordScore < 100 && passwordScore > 60
                      ? 'warning'
                      : 'error'
                  }
                  value={passwordScore}
                  variant="determinate"
                />

                <Typography variant="caption" color="secondary">
                  Pour une sécurité optimale de votre mot de passe, nous vous
                  conseillons:
                </Typography>
                <Typography
                  variant="caption"
                  color={passwordReccomendation.length ? '#66bb6a' : 'error'}
                  sx={{ mt: '0 !important' }}
                >
                  {passwordReccomendation.length ? (
                    <>&#10003;</>
                  ) : (
                    <>&#10005;</>
                  )}{' '}
                  8 caractères minimum
                </Typography>
                <Typography
                  variant="caption"
                  color={passwordReccomendation.lowerCase ? '#66bb6a' : 'error'}
                  sx={{ mt: '0 !important' }}
                >
                  {passwordReccomendation.lowerCase ? (
                    <>&#10003;</>
                  ) : (
                    <>&#10005;</>
                  )}{' '}
                  Une miniscule
                </Typography>
                <Typography
                  variant="caption"
                  color={passwordReccomendation.upperCase ? '#66bb6a' : 'error'}
                  sx={{ mt: '0 !important' }}
                >
                  {passwordReccomendation.upperCase ? (
                    <>&#10003;</>
                  ) : (
                    <>&#10005;</>
                  )}{' '}
                  Une majuscule
                </Typography>
                <Typography
                  variant="caption"
                  color={passwordReccomendation.number ? '#66bb6a' : 'error'}
                  sx={{ mt: '0 !important' }}
                >
                  {passwordReccomendation.number ? (
                    <>&#10003;</>
                  ) : (
                    <>&#10005;</>
                  )}{' '}
                  Un chiffre [0- 9]
                </Typography>
                <Typography
                  variant="caption"
                  color={
                    passwordReccomendation.specialChar ? '#66bb6a' : 'error'
                  }
                  sx={{ mt: '0 !important' }}
                >
                  {passwordReccomendation.specialChar ? (
                    <>&#10003;</>
                  ) : (
                    <>&#10005;</>
                  )}{' '}
                  Un caractère spécial ( !, ?, @, ...)
                </Typography>
              </>
            )}
          </Stack>
          {response.length > 0 && (
            <Box
              sx={{
                width: '100%',
                borderRadius: 2,
                border:
                  response === 'success'
                    ? '1px solid #66bb6a'
                    : '1px solid red',
                mt: 2,
                p: 2,
              }}
            >
              <Typography color={response === 'success' ? '#66bb6a' : 'red'}>
                {response === 'success'
                  ? 'Mot de passe modifié avec succes'
                  : 'Ancien mot de passe erroné'}
              </Typography>
            </Box>
          )}
          <Stack direction="row-reverse" sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" sx={{ borderRadius: 5 }}>
              Confirmer
            </Button>
          </Stack>
        </Box>
      </form>
    </Box>
  );
}

export default SecurityTab;
