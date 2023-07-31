/* eslint-disable react-hooks/exhaustive-deps */
import React, { MouseEvent, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

// Material Components

import {
  Avatar,
  Badge,
  Box,
  Chip,
  Container,
  Divider,
  Drawer,
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
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import { RootState } from '../../../app/store';
import { UseSignout } from '../../../hooks/auth/UseSignout';
import Notification from '../../../utils/Interfaces/Notification.interface';
import NotificationEntry from '../../notifications/Notification';

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

const UNSEEN_NOTIFICATIONS_COUNT = gql`
  query Query {
    userUnseenNotificationsCount
  }
`;

const LATEST_NOTIFICATIONS = gql`
  query LatestNotifications {
    userLatestNotifications {
      id
      title
      body
      action
      createdBy
      targetUserId
      seen
      createdAt
      user {
        id
        username
        firstname
        lastname
        profilePictureUrl
      }
    }
  }
`;

const NOTIFICATION_SUBSCRIPTION = gql`
  subscription Subscription($userId: String) {
    notificationCreated(userId: $userId) {
      notification {
        id
        seen
        body
        action
        targetUserId
        createdBy
      }
    }
  }
`;

const MARK_AS_SEEN = gql`
  mutation MarkAsSeen($markAsSeenId: String) {
    markAsSeen(id: $markAsSeenId) {
      id
    }
  }
`;

export default function Navbar() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [markAsSeen] = useMutation(MARK_AS_SEEN);

  const navigate = useNavigate();

  const location = useLocation();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { signout } = UseSignout();

  const { data: unseenNotificationsCount, refetch: refetchUnseen } = useQuery(
    UNSEEN_NOTIFICATIONS_COUNT
  );

  const { data: notificationData } = useSubscription(
    NOTIFICATION_SUBSCRIPTION,
    {
      variables: { userId: user.id },
    }
  );

  const { data: latestNotifications, refetch: refetchLatest } =
    useQuery(LATEST_NOTIFICATIONS);

  const [notificationsPanel, setNotificationsPanel] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (destination?: string) => {
    if (destination === 'profile') navigate(`/klader/${user.username}`);
    if (destination === 'settings') navigate(`/settings`);
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (notificationData?.notificationCreated?.notification) {
      enqueueSnackbar(
        <Box>
          <Stack
            direction="row"
            spacing={2}
            display="flex"
            alignContent="center"
          >
            <Typography fontFamily="Ubuntu">
              {notificationData.notificationCreated.notification.body}
            </Typography>
          </Stack>
        </Box>,
        {
          key: notificationData.notificationCreated.notification.title,
          variant: 'success',
          anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
          SnackbarProps: {
            onClick: () => {
              navigate(
                notificationData.notificationCreated.notification.action
              );
              closeSnackbar(
                notificationData.notificationCreated.notification.title
              );
            },
            style: {},
          },
          hideIconVariant: true,
          autoHideDuration: 5000,
        }
      );
      refetchLatest();
      refetchUnseen();
    }
  }, [notificationData, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    refetchLatest();
    refetchUnseen();
  }, [location]);

  return (
    <AppBar sx={{ backgroundColor: 'white' }}>
      <Container sx={{ m: 0 }} maxWidth={false}>
        <Toolbar disableGutters>
          <Stack
            alignContent="center"
            justifyContent="center"
            direction="row"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
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
                <Typography
                  color="black"
                  fontSize=".8rem"
                  fontWeight="500"
                  textTransform="capitalize"
                >
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={`/klader/${user.username}`}
                  >
                    {`${user.firstname} ${user.lastname}`}
                  </Link>
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
                <Avatar alt="Avatar" src={user.profilePictureUrl} />
              </IconButton>
              <IconButton
                sx={{
                  width: '45px',
                  height: '45px',
                  backgroundColor: '#F5F6F9',
                  p: 1,
                }}
                onClick={() => setNotificationsPanel(!notificationsPanel)}
              >
                <Badge
                  badgeContent={
                    unseenNotificationsCount
                      ? unseenNotificationsCount.userUnseenNotificationsCount
                      : ' '
                  }
                  color="primary"
                >
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
              onClose={() => handleCloseUserMenu()}
            >
              <MenuItem onClick={() => handleCloseUserMenu('profile')}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleCloseUserMenu('settings')}>
                <Typography textAlign="center">Settings</Typography>
              </MenuItem>
              <MenuItem onClick={() => signout()}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        anchor="right"
        open={notificationsPanel}
        onClose={() => setNotificationsPanel(false)}
        PaperProps={{ style: { borderRadius: '1rem', height: 'auto' } }}
        sx={{
          maxWidth: '350px',
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            maxWidth: '350px',
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        {/* <DrawerHeader /> */}
        <Box sx={{ minWidth: '350px' }}>
          <Box>
            <Typography px={2} py={1}>
              Dernières notifications
            </Typography>
          </Box>
          {latestNotifications &&
            latestNotifications?.userLatestNotifications.map(
              (notification: Notification, index: number) => (
                <Box key={notification.id}>
                  <NotificationEntry notification={notification} />
                  {index + 1 !==
                    latestNotifications.userLatestNotifications.length && (
                    <Divider />
                  )}
                </Box>
              )
            )}
          <Box display="flex" justifyContent="center">
            <Typography px={2} py={1} fontSize={12}>
              <Link
                style={{ textDecoration: 'underline', color: '#305CE9' }}
                to="/notifications"
                onClick={() => setNotificationsPanel(false)}
              >
                Voir tout
              </Link>
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}
