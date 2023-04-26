import { useState, MouseEvent } from 'react';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';

import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import { ReactComponent as Google } from '../../assets/social logos/google.svg';
import { ReactComponent as Facebook } from '../../assets/social logos/facebook.svg';
import CustomTextField from '../common/inputs/CustomTextField';

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
        <CustomTextField
          InputProps={{ disableUnderline: true }}
          variant="filled"
          label="Email"
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
          variant="filled"
          type={showPassword ? 'text' : 'password'}
          label="Mot de passe"
        />
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
    </Box>
  );
}

export default SigninForm;
