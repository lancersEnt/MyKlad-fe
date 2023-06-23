/* eslint-disable react/jsx-props-no-spreading */
import { useState, MouseEvent } from 'react';
import { useForm, Resolver } from 'react-hook-form';

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
import CustomTextField from '../common/inputs/CustomTextField';
import CustomSelectField from '../common/inputs/CustomSelectField';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  sex: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.firstName ? values : {},
    errors: !values.firstName
      ? {
          firstName: {
            type: 'required',
            message: 'First name is required.',
          },
        }
      : {},
  };
};

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit((data) => console.log(data));

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
              {...register('firstName')}
              sx={{ border: errors?.firstName ? '1px solid #d32f2f' : 'none' }}
              fullWidth
            />
            {errors?.firstName && (
              <Typography sx={{ marginTop: '0' }} color="error">
                {errors.firstName.message}
              </Typography>
            )}
          </Box>

          {/* input Nom */}
          <CustomTextField
            InputProps={{ disableUnderline: true }}
            variant="filled"
            label="nom"
            {...register('lastName')}
          />
          {/* Input Email */}
          <CustomTextField
            InputProps={{ disableUnderline: true }}
            variant="filled"
            label="Email"
            {...register('email')}
          />
          {/* Input Password */}
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
            variant="filled"
            type={showPassword ? 'text' : 'password'}
            label="Mot de passe"
            {...register('password')}
          />
          {/* Input DOB */}
          <CustomTextField
            InputProps={{ disableUnderline: true }}
            variant="filled"
            label="Date de naissance"
            type="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
            {...register('dateOfBirth')}
          />
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
              }}
              disableUnderline
              labelId="sex"
              id="sex-select"
              label="Genre"
              {...register('sex')}
              variant="filled"
            >
              <MenuItem value="male">Mâle</MenuItem>
              <MenuItem value="female">Femelle</MenuItem>
            </CustomSelectField>
          </FormControl>
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
    </Box>
  );
}

export default SignUpForm;
