/* eslint-disable import/no-named-as-default */
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import { LIVE_KLAD } from '../utils/GraphQL/Queries';
import KladReviewHeader from '../components/KladReview/KladReviewHeader';
import KladTabs from '../components/KladReview/KladTabs';
import NotFound from './Errors/NotFound';
import Investment from '../components/klad/Investment';

function Klad() {
  const { kladId } = useParams();
  const { data, loading, error } = useQuery(LIVE_KLAD, {
    variables: { kladId },
  });

  return (
    <Box>
      {loading && <Typography>Loading ... </Typography>}
      {error && error.message === 'No Klad found' && <NotFound />}
      {data && !loading && (
        <Grid container sx={{ pl: { xs: 0, sm: 0, md: '5rem' } }}>
          <Grid item lg={2} display={{ xs: 'none', sm: 'none', lg: 'flex' }} />
          <Grid item xs={12} sm={12} lg={8}>
            <KladReviewHeader klad={data.liveKlad} />
            <Investment klad={data.liveKlad} />
            <KladTabs klad={data.liveKlad} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
export default Klad;
