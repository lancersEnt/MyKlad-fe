// Material Components
import { Box, Container } from '@mui/material';
// router outlet
import { useOutlet } from 'react-router-dom';
import Navbar from '../components/common/navigation/Navbar';
import { DrawerHeader } from '../components/common/navigation/Sidebar';

function LoggedInLayout() {
  const outlet = useOutlet();
  return (
    <Box>
      <Navbar />
      <Box component="main" px={{ xs: 0, sm: 0, md: 10 }} sx={{ flexGrow: 1 }}>
        <Box>
          <DrawerHeader />
        </Box>
        <Container sx={{ px: 0 }}>{outlet}</Container>
      </Box>
    </Box>
  );
}
export default LoggedInLayout;
