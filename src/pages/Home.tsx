import { Box, Grid } from '@mui/material';
import Stories from '../components/home/Stories/Stories';
import Feed from '../components/home/feed/Feed';
import Events from '../components/home/events/Events';

function Home() {
  return (
    <Box>
      <Grid
        container
        spacing={10}
        sx={{ pl: { xs: 0, sm: 0, md: '5rem' }, pt: '5rem' }}
      >
        <Grid item xs={12} sm={12} lg={7}>
          <Stories />
          <Feed />
        </Grid>
        <Grid
          item
          xs={0}
          sm={0}
          lg={5}
          display={{ xs: 'none', sm: 'none', lg: 'block' }}
        >
          <Events />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
