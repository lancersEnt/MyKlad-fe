import * as React from 'react';
import { styled } from '@mui/material/styles';

// Material Components

import {
  Avatar,
  Badge,
  Box,
  Chip,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

// icons
import NotificationsIcon from '@mui/icons-material/NotificationsNone';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export default function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar sx={{ backgroundColor: 'white' }}>
      <Container sx={{ m: 0 }} maxWidth={false}>
        <Toolbar disableGutters>
          <Stack alignContent="center" justifyContent="center" direction="row">
            <Box sx={{ mr: 1 }}>
              <img src="/MyKladIcon.png" alt="MyKlad Icon" width="50px" />
            </Box>
            <Typography
              variant="h6"
              lineHeight="3rem"
              fontWeight={700}
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                color: 'black',
                textDecoration: 'none',
              }}
            >
              myKlad
            </Typography>
          </Stack>
          <Box sx={{ flexGrow: 0, ml: 'auto' }}>
            <Stack direction="row-reverse" spacing={2}>
              <Box
                display={{ xs: 'none', sm: 'none', md: 'block' }}
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                onClick={handleOpenUserMenu}
              >
                <Tooltip title="open menu">
                  <ExpandMoreIcon sx={{ color: 'black', my: 'auto' }} />
                </Tooltip>
              </Box>
              <Stack display={{ xs: 'none', sm: 'none', md: 'block' }}>
                <Typography color="black" fontSize=".8rem" fontWeight="500">
                  Saaf Ghassen
                  {/* <ExpandMoreIcon /> */}
                </Typography>
                <Chip
                  label="123 456$"
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              </Stack>

              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Avatar" src="" />
              </IconButton>
              <IconButton
                sx={{
                  width: '45px',
                  height: '45px',
                  backgroundColor: '#F5F6F9',
                  p: 1,
                }}
              >
                <Badge badgeContent={17} color="primary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                sx={{
                  width: '45px',
                  height: '45px',
                  backgroundColor: '#F5F6F9',
                  p: 1,
                }}
              >
                <AppsIcon />
              </IconButton>
              <IconButton
                sx={{
                  width: '45px',
                  height: '45px',
                  backgroundColor: '#F5F6F9',
                  p: 1,
                  borderRadius: '5rem',
                }}
              >
                <SearchIcon />
              </IconButton>
            </Stack>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to="/klader/1"
                  >
                    Profile
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to="/settings"
                  >
                    Settings
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
