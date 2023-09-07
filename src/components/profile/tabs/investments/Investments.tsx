import { ReactElement } from 'react';

import { Box, Grid, Stack, Typography } from '@mui/material';

import InvestmentEntry from './InvestmentEntry';
import { Investment } from '../../../../utils/Interfaces/Investment.interface';

interface InvestmentsProps {
  investments: Investment[];
}

function Investments({ investments }: InvestmentsProps): ReactElement {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: 'white',
          px: 3,
          pt: 2,
          pb: 4,
          borderRadius: 3,
          boxShadow: 1,
        }}
      >
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Typography
            component="h2"
            fontSize={16}
            fontWeight={500}
            lineHeight={2.25}
          >
            Investissement
          </Typography>
        </Stack>
        <Grid container spacing={2} px={1}>
          {investments.map((investment) => (
            <InvestmentEntry investment={investment} key={investment.id} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
export default Investments;
