import { Box, Typography } from '@mui/material';
import KladEntry from './KladEntry';

function Klads() {
  return (
    <Box>
      <Typography fontSize={16} fontWeight={500} gutterBottom>
        Klads en cours
      </Typography>
      {[1, 2, 3].map((klad) => (
        <KladEntry key={klad} />
      ))}
      <Typography fontSize={16} fontWeight={500} gutterBottom>
        Klads en cours
      </Typography>
      {[1].map((klad) => (
        <KladEntry key={klad} />
      ))}
    </Box>
  );
}
export default Klads;
