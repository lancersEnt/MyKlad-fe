import { useState, MouseEvent } from 'react';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [sex, setSex] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSexChange = (event: SelectChangeEvent) => {
    setSex(event.target.value as string);
  };
  return (
    <Box
      p="3rem"
      boxShadow="3"
      sx={{
        ml: 'auto',
        mr: 'auto',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        maxWidth: '700px',
      }}
    >
      <Stack spacing={2}>
        <Typography mx="auto" variant="h5" fontWeight={500}>
          Inscrivez-vous
        </Typography>
        {/* Input Nom  */}
        <FormControl
          sx={{ m: 1, backgroundColor: '#F4F7F9' }}
          variant="outlined"
          fullWidth
        >
          <InputLabel htmlFor="nom">Nom</InputLabel>
          <OutlinedInput id="nom" type="text" label="Nom" autoFocus />
        </FormControl>
        {/* input Prenom */}
        <FormControl
          sx={{ m: 1, backgroundColor: '#F4F7F9' }}
          variant="outlined"
          fullWidth
        >
          <InputLabel htmlFor="prenom">Prenom</InputLabel>
          <OutlinedInput id="prenom" type="text" label="Prenom" />
        </FormControl>
        {/* Input Email */}
        <FormControl
          sx={{ m: 1, backgroundColor: '#F4F7F9' }}
          variant="outlined"
          fullWidth
        >
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput id="email" type="text" label="Email" />
        </FormControl>
        {/* Input Password */}
        <FormControl
          sx={{ m: 1, backgroundColor: '#F4F7F9' }}
          variant="outlined"
          fullWidth
        >
          <InputLabel htmlFor="password">Mot de passe</InputLabel>
          <OutlinedInput
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
        {/* Input DOB */}
        <FormControl
          sx={{ m: 1, backgroundColor: '#F4F7F9' }}
          variant="outlined"
          fullWidth
        >
          {/* <InputLabel htmlFor="dob">Date de naissance</InputLabel> */}
          <OutlinedInput id="password" type="date" />
        </FormControl>
        {/* Input Sex */}
        <FormControl sx={{ m: 1, backgroundColor: '#F4F7F9' }} fullWidth>
          <InputLabel id="sex">Genre</InputLabel>
          <Select
            labelId="sex"
            id="sex-select"
            value={sex}
            label="Genre"
            onChange={handleSexChange}
          >
            <MenuItem value="male">Mâle</MenuItem>
            <MenuItem value="femelle">Femelle</MenuItem>
          </Select>
        </FormControl>
        <Button
          size="large"
          sx={{ borderRadius: '50px', textTransform: 'unset' }}
          variant="contained"
        >
          <Typography py=".5rem" fontSize=".8rem">
            S&apos;inscrire
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
}

export default SignUpForm;
