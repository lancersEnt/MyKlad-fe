import { useState, MouseEvent } from 'react';
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

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [sex, setSex] = useState('male');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSexChange = (event: SelectChangeEvent<unknown>) => {
    setSex(event.target.value as string);
  };
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
      <Stack spacing={2}>
        <Typography mx="auto" variant="h5" fontWeight={500}>
          Inscrivez-vous
        </Typography>
        {/* Input Nom  */}
        <CustomTextField
          InputProps={{ disableUnderline: true }}
          variant="filled"
          label="Nom"
        />
        {/* input Prenom */}
        <CustomTextField
          InputProps={{ disableUnderline: true }}
          variant="filled"
          label="Prenom"
        />
        {/* Input Email */}
        <CustomTextField
          InputProps={{ disableUnderline: true }}
          variant="filled"
          label="Email"
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
        />
        {/* Input DOB */}
        <CustomTextField
          InputProps={{ disableUnderline: true }}
          variant="filled"
          label="Date de naissance"
          type="date"
          defaultValue="2022-01-01"
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
            value={sex}
            onChange={handleSexChange}
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
