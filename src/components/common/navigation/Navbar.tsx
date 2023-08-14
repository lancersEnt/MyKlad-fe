/* eslint-disable react-hooks/exhaustive-deps */
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
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
  Grid,
  IconButton,
  InputAdornment,
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
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useMutation, useQuery, useSubscription } from '@apollo/client';
import {
  DoneRounded,
  ExpandLess,
  FileCopyOutlined,
  LogoutOutlined,
  LoopRounded,
  SettingsBackupRestoreOutlined,
  SettingsOutlined,
  StarBorderOutlined,
  SupervisorAccountOutlined,
} from '@mui/icons-material';
import { RootState } from '../../../app/store';
import { UseSignout } from '../../../hooks/auth/UseSignout';
import Notification from '../../../utils/Interfaces/Notification.interface';
import NotificationEntry from '../../notifications/Notification';
import CustomTextField from '../inputs/CustomTextField';
import {
  MARK_AS_SEEN,
  SWITCH_ACCOUNT,
  SWITCH_BACK,
} from '../../../utils/GraphQL/Mutations';
import {
  LATEST_NOTIFICATIONS,
  UNSEEN_NOTIFICATIONS_COUNT,
} from '../../../utils/GraphQL/Queries';
import { NOTIFICATION_SUBSCRIPTION } from '../../../utils/GraphQL/Subscriptions';
import CreatePage from '../../modals/CreatePage';
import CreateKlad from '../../modals/CreateKlad';

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
  const user = useSelector((state: RootState) => state.auth.user);

  const [markAsSeen] = useMutation(MARK_AS_SEEN);

  const [switchAccount] = useMutation(SWITCH_ACCOUNT);

  const [switchBack] = useMutation(SWITCH_BACK);

  const [searchInput, setSearchInput] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const searchInputRef = useRef(null);

  const navigate = useNavigate();

  const location = useLocation();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { signout } = UseSignout();

  const [createPage, setCreatePage] = useState(false);

  const OpenCreatePage = () => {
    setCreatePage(true);
  };

  const CloseCreatePage = () => {
    setCreatePage(false);
  };

  const [createKlad, setCreateKlad] = useState(false);

  const OpenCreateKlad = () => {
    setCreateKlad(true);
  };

  const CloseCreateKlad = () => {
    setCreateKlad(false);
  };

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
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = async (destination?: string) => {
    if (destination === 'profile')
      navigate(
        user.permissions.includes('user')
          ? `/klader/${user.username}`
          : `/page/${user.username}`,
        { preventScrollReset: false }
      );
    if (destination === 'settings')
      navigate(`/settings`, { preventScrollReset: false });
    if (destination === 'addPage') OpenCreatePage();
    if (destination === 'addKlad') OpenCreateKlad();
    if (destination === 'switchBack')
      await switchBack({
        onCompleted() {
          navigate(0);
        },
      });
    setMenuIsOpen(false);
    setAnchorElUser(null);
  };

  const handleBlur = (event: any) => {
    // Check if the blur event is triggered because of a click on the search button.
    const { target } = event;
    setTimeout(() => {
      if (target.contains(document.activeElement)) {
        // The search button was clicked, do not hide the input.
        return;
      }
      // The blur happened due to other reasons, hide the input.
      setSearchInput(false);
    }, 0);
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
                notificationData.notificationCreated.notification.action,
                { preventScrollReset: false }
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
            onClick={() => navigate('/', { preventScrollReset: false })}
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
                  {anchorElUser ? (
                    <ExpandLess
                      sx={{ color: 'black', my: 'auto', cursor: 'pointer' }}
                    />
                  ) : (
                    <ExpandMoreIcon
                      sx={{ color: 'black', my: 'auto', cursor: 'pointer' }}
                    />
                  )}
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
                    preventScrollReset
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={
                      user.permissions.includes('user')
                        ? `/klader/${user.username}`
                        : `/page/${user.username}`
                    }
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
              {!searchInput && (
                <>
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
                          : null
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
                      borderRadius: '5rem',
                    }}
                    onClick={() => setSearchInput(true)}
                  >
                    <SearchIcon />
                  </IconButton>
                </>
              )}
              {searchInput && (
                <form
                  action=""
                  onSubmit={(e) => {
                    e.preventDefault();
                    navigate(`/search/${searchQuery}`, {
                      preventScrollReset: false,
                    });
                  }}
                >
                  <CustomTextField
                    onBlur={handleBlur}
                    placeholder="Search"
                    variant="filled"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                      height: '45px',
                      justifyContent: 'center',
                      borderRadius: 5,
                      transition: 'width s ease-in-out', // Add a CSS transition property for the animation
                      width: '20px', // Set an initial width for the input
                      '&.visible': {
                        width: '220px', // Set the width when the input is visible
                      },
                    }}
                    className={searchInput ? 'visible' : ''}
                    InputProps={{
                      hiddenLabel: true,
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position="end" className="searchButton">
                          <IconButton edge="end" type="submit">
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </form>
              )}
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
              PaperProps={{
                style: {
                  minWidth: '350px',
                  width: '500px',
                  padding: 5,
                  borderRadius: '.5rem',
                },
              }}
              open={Boolean(anchorElUser)}
              onClose={() => handleCloseUserMenu()}
            >
              <Box>
                <Grid container spacing={1}>
                  <Grid
                    item
                    xs={3.5}
                    sm={3.5}
                    md={4}
                    sx={{ px: 0.5, borderRight: '1px solid #e0e0e0' }}
                  >
                    <Box
                      sx={{
                        py: 1,
                        borderRadius: 3,
                        backgroundColor: '#F0F0F0',
                      }}
                    >
                      <Typography
                        fontSize={14}
                        fontWeight={500}
                        gutterBottom
                        px={2}
                      >
                        Ajouter :
                      </Typography>
                      <Stack spacing={2}>
                        <MenuItem
                          sx={{ borderRadius: 2, width: '100%' }}
                          onClick={() => handleCloseUserMenu('addPage')}
                          disabled={user.permissions.includes('page')}
                        >
                          <Stack direction="row" spacing={1}>
                            <FileCopyOutlined />
                            <Typography
                            // sx={{
                            //   display: {
                            //     xs: 'none',
                            //     sm: 'none',
                            //     md: 'block',
                            //   },
                            // }}
                            >
                              Page
                            </Typography>
                          </Stack>
                        </MenuItem>
                        <MenuItem
                          sx={{ borderRadius: 2, width: '100%' }}
                          onClick={() => handleCloseUserMenu('addKlad')}
                          disabled={user.permissions.includes('user')}
                        >
                          <Stack direction="row" spacing={1}>
                            <StarBorderOutlined />
                            <Typography
                            // sx={{
                            //   display: {
                            //     xs: 'none',
                            //     sm: 'none',
                            //     md: 'block',
                            //   },
                            // }}
                            >
                              Klad
                            </Typography>
                          </Stack>
                        </MenuItem>
                      </Stack>
                    </Box>
                    {!user.permissions.includes('expert') &&
                      !user.permissions.includes('admin') &&
                      user.permissions.includes('user') && (
                        <>
                          <Divider sx={{ my: 1 }} />
                          <Box
                            sx={{
                              py: 1,
                              borderRadius: 3,
                              backgroundColor: '#F0F0F0',
                            }}
                          >
                            <Stack spacing={2}>
                              <MenuItem
                                sx={{ borderRadius: 2, width: '100%' }}
                                onClick={() => handleCloseUserMenu('profile')}
                              >
                                <Stack direction="row" spacing={1}>
                                  <SupervisorAccountOutlined />
                                  <Typography display={{ xs: 'none' }}>
                                    Devenir expert
                                  </Typography>
                                </Stack>
                              </MenuItem>
                            </Stack>
                          </Box>
                        </>
                      )}
                  </Grid>
                  <Grid item xs={8.5} sm={8.5} md={8}>
                    <Box
                      sx={{
                        py: 1,
                        borderRadius: 3,
                        backgroundColor: '#F0F0F0',
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ justifyContent: 'space-between', px: 1 }}
                      >
                        <Stack
                          direction="row"
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <IconButton sx={{ my: 'auto' }}>
                            <Avatar
                              alt="Avatar"
                              sx={{ width: 30, height: 30 }}
                              src={user.profilePictureUrl}
                            />
                          </IconButton>
                          <Typography
                            fontWeight={500}
                            fontSize={14}
                            textTransform="capitalize"
                          >
                            <Link
                              preventScrollReset
                              style={{
                                textDecoration: 'none',
                                color: 'black',
                              }}
                              to={
                                user.permissions.includes('user')
                                  ? `/klader/${user.username}`
                                  : `/page/${user.username}`
                              }
                            >{`${user.firstname} ${user.lastname}`}</Link>
                          </Typography>
                        </Stack>
                        <IconButton disabled>
                          <DoneRounded />
                        </IconButton>
                      </Stack>
                      {user.pages.map((page) => (
                        <Stack
                          key={page.username}
                          direction="row"
                          spacing={1}
                          sx={{ justifyContent: 'space-between', px: 1 }}
                        >
                          <Stack
                            direction="row"
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            <IconButton sx={{ my: 'auto' }}>
                              <Avatar
                                alt="Avatar"
                                sx={{ width: 30, height: 30 }}
                                src={page.profilePictureUrl}
                              />
                            </IconButton>
                            <Typography
                              fontWeight={500}
                              fontSize={14}
                              textTransform="capitalize"
                            >
                              <Link
                                preventScrollReset
                                style={{
                                  textDecoration: 'none',
                                  color: 'black',
                                }}
                                to={
                                  page.permissions.includes('user')
                                    ? `/klader/${page.username}`
                                    : `/page/${page.username}`
                                }
                              >{`${page.firstname} ${page.lastname}`}</Link>
                            </Typography>
                          </Stack>
                          <IconButton
                            onClick={async () => {
                              await switchAccount({
                                variables: {
                                  targetId: page.id,
                                },
                                onCompleted() {
                                  navigate(0);
                                },
                              });
                            }}
                          >
                            <LoopRounded />
                          </IconButton>
                        </Stack>
                      ))}
                    </Box>
                    {user.permissions.includes('page') && (
                      <>
                        <Divider sx={{ my: 1 }} />
                        <Stack>
                          <MenuItem
                            sx={{ borderRadius: 2 }}
                            onClick={() => handleCloseUserMenu('switchBack')}
                          >
                            <Stack spacing={1} direction="row">
                              <SettingsBackupRestoreOutlined />
                              <Typography textAlign="center">
                                Profil principal
                              </Typography>
                            </Stack>
                          </MenuItem>
                        </Stack>
                      </>
                    )}
                    <Divider sx={{ my: 1 }} />
                    <Stack>
                      <MenuItem
                        sx={{ borderRadius: 2 }}
                        onClick={() => handleCloseUserMenu('settings')}
                      >
                        <Stack spacing={1} direction="row">
                          <SettingsOutlined />
                          <Typography textAlign="center">Parametres</Typography>
                        </Stack>
                      </MenuItem>
                      <MenuItem
                        sx={{ borderRadius: 2 }}
                        onClick={() => signout()}
                      >
                        <Stack spacing={1} direction="row">
                          <LogoutOutlined />
                          <Typography textAlign="center">
                            Se deconnecter
                          </Typography>
                        </Stack>
                      </MenuItem>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
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
                preventScrollReset
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
      <CreatePage open={createPage} handleClose={CloseCreatePage} />
      <CreateKlad open={createKlad} handleClose={CloseCreateKlad} />
    </AppBar>
  );
}
