import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { Klad } from '../../utils/Interfaces/Klad.interface';

interface DocumentProps {
  klad: Klad;
}
function Documents({ klad }: DocumentProps) {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography component="h2" variant="h5" fontWeight={500} gutterBottom>
          Documents
        </Typography>{' '}
        <Button
          variant="outlined"
          size="small"
          sx={{ borderRadius: 5, textTransform: 'none' }}
        >
          Ajouter un document
        </Button>
      </Stack>
    </Box>
  );
}

export default Documents;
