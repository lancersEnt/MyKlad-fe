import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

function SigninForm() {
  return (
    <Box
      p="3rem"
      ml="auto"
      mr="auto"
      boxShadow="6"
      sx={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        maxWidth: '450px',
      }}
    >
      <Stack spacing={2}>
        <Typography mx="auto" variant="h5">
          Identifiez-vous
        </Typography>
        <TextField
          sx={{ backgroundColor: '#F5F6F9' }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <TextField
          sx={{ backgroundColor: '#F5F6F9' }}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
        />
        <Button size="large" sx={{ borderRadius: '50px' }} variant="contained">
          Connexion
        </Button>
        <Divider>OU</Divider>
        <Button
          size="large"
          style={{ borderRadius: '50px' }}
          variant="outlined"
          color="secondary"
        >
          <Typography color="black">
            <GoogleIcon sx={{ fontSize: '0.8rem', mr: '0.5rem' }} />
            Se connecter avec Google
          </Typography>
        </Button>
        <Button
          size="large"
          style={{ borderRadius: '50px' }}
          variant="outlined"
          color="secondary"
        >
          <Typography color="black">
            <FacebookIcon sx={{ fontSize: '0.8rem', mr: '0.5rem' }} />
            Se connecter avec Facebook
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
}

export default SigninForm;
