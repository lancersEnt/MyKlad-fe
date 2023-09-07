/* eslint-disable react/jsx-no-undef */
import { Box, Grid, Typography } from '@mui/material';

import { useLocation } from 'react-router-dom';
import SearchTabs from '../components/search/SearchTabs';

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q');
  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{ pl: { xs: 0, sm: 0, md: '5rem' }, pt: '5rem' }}
      >
        <Grid item lg={2.5} display={{ xs: 'none', sm: 'none', lg: 'flex' }} />
        <Grid item xs={12} sm={12} lg={7}>
          <Box>
            <Typography variant="caption">
              resultats pour {`<< ${query} >>`}
            </Typography>
            <SearchTabs />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export default SearchResults;
