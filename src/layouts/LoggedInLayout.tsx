// Material Components
import { Box, Container } from '@mui/material';
// router outlet
import { useOutlet } from 'react-router-dom';
import BottomNav from '../components/common/navigation/BottomNav';
import Navbar from '../components/common/navigation/Navbar';
import Sidebar, { DrawerHeader } from '../components/common/navigation/Sidebar';

function LoggedInLayout() {
  const outlet = useOutlet();
  return (
    <Box>
      <Navbar />
      <Box display={{ xs: 'none', sm: 'none', md: 'block' }}>
        <Sidebar />
      </Box>
      <Box component="main" px={{ xs: 0, sm: 0, md: 10 }} sx={{ flexGrow: 1 }}>
        <Box display={{ xs: 'none', sm: 'none', md: 'block' }}>
          <DrawerHeader />
        </Box>
        <Container maxWidth={false}>{outlet}</Container>
      </Box>
      <Box
        display={{ xs: 'block', sm: 'block', md: 'none' }}
        sx={{
          boxShadow: 3,
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: '1.5rem',
          borderTopRightRadius: '1.5rem',
        }}
      >
        <BottomNav />
      </Box>
    </Box>
  );
}
export default LoggedInLayout;
