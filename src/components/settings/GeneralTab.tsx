import { Box, Stack, Typography } from '@mui/material';
import { ReactElement } from 'react';
import CustomTextField from '../common/inputs/CustomTextField';

function GeneralTab(): ReactElement {
  return (
    <Box>
      <Typography
        component="h2"
        variant="h5"
        fontSize={18}
        fontWeight={500}
        py="1rem"
        gutterBottom
      >
        Paramètres généraux
      </Typography>
      <Typography
        component="h2"
        variant="h5"
        fontSize={14}
        fontWeight={500}
        py="1rem"
      >
        Informations personnelles
      </Typography>
      <Box>
        <Stack spacing={2}>
          <CustomTextField
            fullWidth
            InputProps={{ disableUnderline: true }}
            variant="filled"
            label="Prénom d'usage"
          />
          <CustomTextField
            fullWidth
            InputProps={{ disableUnderline: true }}
            variant="filled"
            label="Nom de famille"
          />
          <CustomTextField
            fullWidth
            InputProps={{ disableUnderline: true }}
            variant="filled"
            type="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
            label="Date de naissance"
          />
          <CustomTextField
            fullWidth
            InputProps={{ disableUnderline: true }}
            variant="filled"
            label="Lieu de naissance"
          />
          <CustomTextField
            fullWidth
            InputProps={{ disableUnderline: true }}
            variant="filled"
            label="Nationalité"
          />
          <CustomTextField
            fullWidth
            InputProps={{ disableUnderline: true }}
            variant="filled"
            label="Addresse de domiciliation"
          />
          <CustomTextField
            fullWidth
            InputProps={{ disableUnderline: true }}
            type="email"
            variant="filled"
            label="Email"
          />
          <CustomTextField
            fullWidth
            InputProps={{ disableUnderline: true }}
            variant="filled"
            label="Tél. Portable"
          />
          <CustomTextField
            fullWidth
            InputProps={{ disableUnderline: true }}
            variant="filled"
            label="Tél fixe"
          />
        </Stack>
      </Box>
    </Box>
  );
}

export default GeneralTab;
