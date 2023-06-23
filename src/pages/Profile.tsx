import { Box, Grid } from '@mui/material';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabs from '../components/profile/ProfileTabs';

function Profile() {
  return (
    <Box mb="5rem">
      <Grid
        container
        spacing={2}
        sx={{ pl: { xs: 0, sm: 0, md: '5rem' }, pt: '5rem' }}
      >
        <Grid item lg={2} display={{ xs: 'none', sm: 'none', lg: 'flex' }} />
        <Grid item xs={12} sm={12} lg={8}>
          <ProfileHeader />
          <ProfileTabs />
        </Grid>
      </Grid>
    </Box>
  );
}
export default Profile;
