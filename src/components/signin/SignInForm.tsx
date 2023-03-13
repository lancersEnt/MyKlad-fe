import { useState, MouseEvent } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import {
  Facebook,
  Google,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from '@mui/icons-material';

function SigninForm() {
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
      <Stack spacing={2}>
        <Typography mx="auto" variant="h5" fontWeight={500}>
          Identifiez-vous
        </Typography>
        <FormControl
          sx={{
            m: 1,
            width: '100%',
            backgroundColor: '#F4F7F9',
            borderRadius: '.4rem',
          }}
          variant="outlined"
        >
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            sx={{ borderRadius: '.4rem' }}
            id="email"
            type="text"
            label="Email"
            autoFocus
          />
        </FormControl>
        <FormControl
          sx={{
            m: 1,
            width: '100%',
            backgroundColor: '#F4F7F9',
            borderRadius: '.4rem',
          }}
          variant="outlined"
        >
          <InputLabel htmlFor="password">Mot de passe</InputLabel>
          <OutlinedInput
            sx={{ borderRadius: '.4rem' }}
            id="password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
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
            }
            label="Mot de passe"
          />
        </FormControl>
        <Button
          size="large"
          sx={{ borderRadius: '50px', textTransform: 'unset' }}
          variant="contained"
        >
          <Typography py=".5rem" fontSize=".8rem">
            Connexion
          </Typography>
        </Button>
        <Divider sx={{ fontSize: '1rem', fontWeight: '500', color: 'grey' }}>
          {'   '}OU
        </Divider>
        <Button
          size="large"
          style={{ borderRadius: '50px', textTransform: 'unset' }}
          variant="outlined"
          color="secondary"
        >
          <Typography color="black" fontSize=".8rem">
            <Google sx={{ fontSize: '0.8rem', mr: '0.5rem' }} />
            Se connecter avec Google
          </Typography>
        </Button>
        <Button
          size="large"
          style={{ borderRadius: '50px', textTransform: 'unset' }}
          variant="outlined"
          color="secondary"
        >
          <Typography color="black" fontSize=".8rem">
            <Facebook sx={{ fontSize: '0.8rem', mr: '0.5rem' }} />
            Se connecter avec Facebook
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
}

export default SigninForm;
