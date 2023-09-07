import { useQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import { KLADS } from '../../utils/GraphQL/Queries';
import { Klad } from '../../utils/Interfaces/Klad.interface';
import KladEntry from '../common/KladEntry';

function Recomended() {
  const { data: recomendedKlads, loading, error } = useQuery(KLADS);

  return (
    <Grid container spacing={2}>
      {!loading &&
        recomendedKlads &&
        recomendedKlads.klads.map((klad: Klad) => (
          <KladEntry key={klad.id} klad={klad} />
        ))}
    </Grid>
  );
}
export default Recomended;
