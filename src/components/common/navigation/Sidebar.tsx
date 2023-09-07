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
import HomeIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenterOutlined';
import VerifiedIcon from '@mui/icons-material/VerifiedOutlined';
import BookmarkIcon from '@mui/icons-material/BookmarksOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DashboardOutlined } from '@mui/icons-material';
import { RootState } from '../../../app/store';

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
  const location = useLocation();
  const isActive = (path: string) => {
    if (path === location.pathname) return true;
    return false;
  };

  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Drawer
      PaperProps={{
        sx: {
          backgroundColor: '#F4F7F9',
        },
      }}
      variant="permanent"
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
          {user.permissions.includes('admin') && (
            <ListItem
              key={0}
              sx={{
                borderRight: isActive('/admin') ? '3px solid #305CE9' : 'none',
                display: 'block',
                mb: '1.5rem',
              }}
            >
              <ListItemButton
                sx={{
                  borderRadius: '50%',
                  backgroundColor: isActive('/admin') ? '#E4EBF7' : 'white',
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  px: 3,
                  py: 3,
                }}
                onClick={() =>
                  navigate('/admin', { preventScrollReset: false })
                }
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <DashboardOutlined
                    color={isActive('/admin') ? 'primary' : 'secondary'}
                  />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          )}
          <ListItem
            key={1}
            sx={{
              borderRight: isActive('/') ? '3px solid #305CE9' : 'none',
              display: 'block',
              mb: '1.5rem',
            }}
          >
            <ListItemButton
              sx={{
                borderRadius: '50%',
                backgroundColor: isActive('/') ? '#E4EBF7' : 'white',
                height: 30,
                width: 30,
                justifyContent: 'center',
                px: 3,
                py: 3,
              }}
              onClick={() => navigate('/', { preventScrollReset: false })}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 'auto',
                  justifyContent: 'center',
                }}
              >
                <HomeIcon color={isActive('/') ? 'primary' : 'secondary'} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem
            key={2}
            sx={{
              borderRight: isActive('/kladers') ? '3px solid #305CE9' : 'none',
              display: 'block',
              mb: '1.5rem',
            }}
          >
            <ListItemButton
              sx={{
                borderRadius: '50%',
                backgroundColor: isActive('/kladers') ? '#E4EBF7' : 'white',
                height: 30,
                width: 30,
                justifyContent: 'center',
                px: 3,
                py: 3,
              }}
              onClick={() =>
                navigate('/kladers', { preventScrollReset: false })
              }
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 'auto',
                  justifyContent: 'center',
                }}
              >
                <PeopleOutlineIcon
                  color={isActive('/kladers') ? 'primary' : 'secondary'}
                />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem
            key={3}
            sx={{
              borderRight: isActive('/klads') ? '3px solid #305CE9' : 'none',
              display: 'block',
              mb: '1.5rem',
            }}
          >
            <ListItemButton
              sx={{
                borderRadius: '50%',
                backgroundColor: isActive('/klads') ? '#E4EBF7' : 'white',
                height: 30,
                width: 30,
                justifyContent: 'center',
                px: 3,
                py: 3,
              }}
              onClick={() => navigate('/klads', { preventScrollReset: false })}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 'auto',
                  justifyContent: 'center',
                }}
              >
                <BusinessCenterIcon
                  color={isActive('/klads') ? 'primary' : 'secondary'}
                />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          {user.permissions.includes('expert') && (
            <ListItem
              key={4}
              sx={{
                borderRight: isActive('/expert-hub')
                  ? '3px solid #305CE9'
                  : 'none',
                display: 'block',
                mb: '1.5rem',
              }}
            >
              <ListItemButton
                sx={{
                  borderRadius: '50%',
                  backgroundColor: isActive('/expert-hub')
                    ? '#E4EBF7'
                    : 'white',
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  px: 3,
                  py: 3,
                }}
                onClick={() =>
                  navigate('/expert-hub', { preventScrollReset: false })
                }
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <VerifiedIcon
                    color={isActive('/expert-hub') ? 'primary' : 'secondary'}
                  />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          )}
          {/* <ListItem key={5} sx={{ display: 'block', mb: '1.5rem' }}>
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
          </ListItem> */}
        </List>
      </Box>
    </Drawer>
  );
}
