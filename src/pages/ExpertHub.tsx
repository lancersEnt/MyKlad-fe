import { Box, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import SubmittedKlads from '../components/ExpertHub/SubmittedKlads';
import ApprovedKlads from '../components/ExpertHub/ApprovedKlads';
import { RootState } from '../app/store';
import Unauthorized from './Errors/Unauthorized';

function ExpertHub() {
  const user = useSelector((state: RootState) => state.auth.user);
  if (user.permissions.includes('expert'))
    return (
      <Box mb="5rem">
        <Grid
          container
          spacing={2}
          sx={{ pl: { xs: 0, sm: 0, md: '5rem' }, pt: '5rem' }}
        >
          <Grid item lg={1} display={{ xs: 'none', sm: 'none', lg: 'flex' }} />
          <Grid item xs={12} sm={12} lg={9}>
            <SubmittedKlads />
            <ApprovedKlads />
          </Grid>
        </Grid>
      </Box>
    );
  return <Unauthorized />;
}
export default ExpertHub;
