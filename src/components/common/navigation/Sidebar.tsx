import { styled } from '@mui/material/styles';

// Mui Components
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';

// icons
import HomeIcon from '@mui/icons-material/Home';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import VerifiedIcon from '@mui/icons-material/Verified';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 0),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <Drawer
      PaperProps={{
        sx: {
          backgroundColor: '#F4F7F9',
        },
      }}
      variant="permanent"
      open={false}
    >
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          py: '5rem',
        }}
      >
        <DrawerHeader />
        <List sx={{ my: 'auto' }}>
          <ListItem
            key={1}
            sx={{
              borderRight: '3px solid #305CE9',
              display: 'block',
              mb: '1.5rem',
            }}
          >
            <ListItemButton
              sx={{
                borderRadius: '50%',
                backgroundColor: '#E4EBF7',
                height: 30,
                width: 30,
                justifyContent: 'center',
                px: 3,
                py: 3,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 'auto',
                  justifyContent: 'center',
                }}
                onClick={() => navigate('/')}
              >
                <HomeIcon color="primary" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem key={2} sx={{ display: 'block', mb: '1.5rem' }}>
            <ListItemButton
              sx={{
                borderRadius: '50%',
                backgroundColor: 'white',
                height: 30,
                width: 30,
                justifyContent: 'center',
                px: 3,
                py: 3,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 'auto',
                  justifyContent: 'center',
                }}
              >
                <PeopleOutlineIcon color="secondary" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem key={3} sx={{ display: 'block', mb: '1.5rem' }}>
            <ListItemButton
              sx={{
                borderRadius: '50%',
                backgroundColor: 'white',
                height: 30,
                width: 30,
                justifyContent: 'center',
                px: 3,
                py: 3,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 'auto',
                  justifyContent: 'center',
                }}
              >
                <BusinessCenterIcon color="secondary" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem key={4} sx={{ display: 'block', mb: '1.5rem' }}>
            <ListItemButton
              sx={{
                borderRadius: '50%',
                backgroundColor: 'white',
                height: 30,
                width: 30,
                justifyContent: 'center',
                px: 3,
                py: 3,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 'auto',
                  justifyContent: 'center',
                }}
              >
                <Diversity2Icon color="secondary" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem key={5} sx={{ display: 'block', mb: '1.5rem' }}>
            <ListItemButton
              sx={{
                borderRadius: '50%',
                backgroundColor: 'white',
                height: 30,
                width: 30,
                justifyContent: 'center',
                px: 3,
                py: 3,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 'auto',
                  justifyContent: 'center',
                }}
              >
                <VerifiedIcon color="secondary" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem key={6} sx={{ display: 'block', mb: '1.5rem' }}>
            <ListItemButton
              sx={{
                borderRadius: '50%',
                backgroundColor: 'white',
                height: 30,
                width: 30,
                justifyContent: 'center',
                px: 3,
                py: 3,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 'auto',
                  justifyContent: 'center',
                }}
              >
                <BookmarkIcon color="secondary" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem key={7} sx={{ display: 'block', mb: '1.5rem' }}>
            <ListItemButton
              sx={{
                borderRadius: '50%',
                backgroundColor: 'white',
                height: 30,
                width: 30,
                justifyContent: 'center',
                px: 3,
                py: 3,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 'auto',
                  justifyContent: 'center',
                }}
              >
                <GroupsIcon color="secondary" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem key={8} sx={{ display: 'block', mb: '1.5rem' }}>
            <ListItemButton
              sx={{
                borderRadius: '50%',
                backgroundColor: 'white',
                height: 30,
                width: 30,
                justifyContent: 'center',
                px: 3,
                py: 3,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 'auto',
                  justifyContent: 'center',
                }}
              >
                <CalendarMonthIcon color="secondary" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
