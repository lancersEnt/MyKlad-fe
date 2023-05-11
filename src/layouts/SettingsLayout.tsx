// Material Components
import { Box, Container } from '@mui/material';
// router outlet
import { useOutlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { DrawerHeader } from '../components/common/Sidebar';

function LoggedInLayout() {
  const outlet = useOutlet();
  return (
    <Box>
      <Navbar />
      <Box component="main" px={{ xs: 0, sm: 0, md: 10 }} sx={{ flexGrow: 1 }}>
        <Box>
          <DrawerHeader />
        </Box>
        <Container maxWidth={false}>{outlet}</Container>
      </Box>
    </Box>
  );
}
export default LoggedInLayout;
