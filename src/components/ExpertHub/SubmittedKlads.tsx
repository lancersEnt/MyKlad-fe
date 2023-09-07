import { useQuery } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import { SUBMITTED_KLADS } from '../../utils/GraphQL/Queries';
import { Klad } from '../../utils/Interfaces/Klad.interface';
import KladEntry from './KladEntry';

function SubmittedKlads() {
  const { loading, error, data: submittedKlads } = useQuery(SUBMITTED_KLADS);

  return (
    <Box>
      <Typography variant="h6" component="h2" gutterBottom>
        Klads en étude
      </Typography>
      {loading && <Typography>Loading ... </Typography>}
      {!loading && error && <Typography>{error.message}</Typography>}
      {!loading && submittedKlads.submittedKlads.length === 0 && (
        <Box px={2}>
          <Typography>
            aucun klad soumis pour le moment, vous serez averti dès qu&apos;un
            nouveau klad sera soumis
          </Typography>
        </Box>
      )}
      {!loading && submittedKlads && (
        <Box>
          {submittedKlads.submittedKlads.map((klad: Klad) => (
            <Box key={klad.id}>
              <KladEntry klad={klad} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
export default SubmittedKlads;
