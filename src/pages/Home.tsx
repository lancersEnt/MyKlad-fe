import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import Stories from '../components/home/Stories/Stories';
import Feed from '../components/home/feed/Feed';
import Events from '../components/home/suggestedKlads/SuggestedKlads';
import { RootState } from '../app/store';

function Home() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Box>
      <Grid
        container
        spacing={10}
        sx={{ pl: { xs: 0, sm: 0, md: '5rem' }, pt: '5rem' }}
      >
        {user.permissions.includes('page') && (
          <Grid
            display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}
            item
            xs={0}
            sm={0}
            lg={2}
          />
        )}
        <Grid item xs={12} sm={12} lg={7}>
          <Feed />
        </Grid>
        <Grid
          item
          xs={0}
          sm={0}
          lg={5}
          display={{
            xs: 'none',
            sm: 'none',
            lg: user.permissions.includes('page') ? 'none' : 'block',
          }}
        >
          <Events />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
