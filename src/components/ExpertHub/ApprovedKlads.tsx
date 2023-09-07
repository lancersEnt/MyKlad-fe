import { useQuery } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import { APPROVED_KLADS } from '../../utils/GraphQL/Queries';
import KladEntry from './KladEntry';
import { Klad } from '../../utils/Interfaces/Klad.interface';

function ApprovedKlads() {
  const { loading, error, data: approvedKlads } = useQuery(APPROVED_KLADS);

  return (
    <Box>
      <Typography variant="h6" component="h2" gutterBottom>
        Klads approuvés
      </Typography>
      {loading && <Typography>Loading ... </Typography>}
      {!loading && error && <Typography>{error.message}</Typography>}
      {!loading && approvedKlads && (
        <Box>
          {approvedKlads.approvedKlads.map((klad: Klad) => (
            <Box key={klad.id}>
              <KladEntry klad={klad} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
export default ApprovedKlads;
