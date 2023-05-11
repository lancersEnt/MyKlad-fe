import { MouseEvent, ReactElement, useState } from 'react';
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';

import CustomTextField from '../common/inputs/CustomTextField';

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 5,
}));

function SecurityTab(): ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <Box>
      <Typography
        component="h2"
        variant="h5"
        fontSize={18}
        fontWeight={500}
        py="1rem"
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
          />
          <BorderLinearProgress
            color="error"
            value={15}
            variant="determinate"
          />
          <Typography variant="caption" color="secondary" fontSize={14}>
            Sécurité faible
          </Typography>
          <Typography variant="caption" color="secondary">
            Pour une sécurité optimale de votre mot de passe, nous vous
            conseillons: <br />- 8 caractères minimum <br />- Une miniscule{' '}
            <br />- Une majuscule <br />- Un chiffre (0- 9) <br />- Un caractère
            spécial( ! - ? - @ - ...)
          </Typography>
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
            label="Confirmation mot de passe"
          />
        </Stack>
      </Box>
    </Box>
  );
}

export default SecurityTab;
