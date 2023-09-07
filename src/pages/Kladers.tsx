/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { RootState } from '../app/store';
import User from '../utils/Interfaces/User.interface';
import { DISCOVER_KLADERS } from '../utils/GraphQL/Queries';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Kladers() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [value, setValue] = useState(0);

  const { data } = useQuery(DISCOVER_KLADERS, {
    variables: {
      discoverInput: {
        userId: user.id,
        limit: 4,
      },
    },
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box pb={5}>
      <Grid
        container
        spacing={10}
        sx={{ pl: { xs: 0, sm: 0, md: '5rem' }, pt: '5rem' }}
      >
        <Grid item lg={3} display={{ xs: 'none', sm: 'none', lg: 'flex' }} />

        <Grid item xs={12} sm={12} lg={6}>
          <Typography variant="h6" component="h2" gutterBottom>
            Kladers
          </Typography>
          <Card sx={{ borderRadius: 2, mb: 5 }}>
            <CardContent>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                  >
                    <Tab label="Abbonnements" {...a11yProps(0)} />
                    <Tab label="Abonnés" {...a11yProps(1)} />
                    <Tab label="Vous connaissez peut-être" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  {user.following.map((follower) => (
                    <Box key={follower.username} sx={{ mb: 2 }}>
                      <Stack
                        direction="row"
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <IconButton sx={{ my: 'auto' }}>
                          <Avatar
                            alt="Avatar"
                            sx={{ width: 30, height: 30 }}
                            src={follower.profilePictureUrl}
                          />
                        </IconButton>
                        <Typography
                          fontWeight={500}
                          fontSize={14}
                          textTransform="capitalize"
                        >
                          <Link
                            preventScrollReset={false}
                            style={{ textDecoration: 'none', color: 'black' }}
                            to={
                              follower.permissions.includes('user')
                                ? `/klader/${follower.username}`
                                : `/page/${follower.username}`
                            }
                          >{`${follower.firstname} ${follower.lastname}`}</Link>
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  {user.followers.map((follower) => (
                    <Box key={follower.username} sx={{ mb: 2 }}>
                      <Stack
                        direction="row"
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <IconButton sx={{ my: 'auto' }}>
                          <Avatar
                            alt="Avatar"
                            sx={{ width: 30, height: 30 }}
                            src={follower.profilePictureUrl}
                          />
                        </IconButton>
                        <Typography
                          fontWeight={500}
                          fontSize={14}
                          textTransform="capitalize"
                        >
                          <Link
                            preventScrollReset={false}
                            style={{ textDecoration: 'none', color: 'black' }}
                            to={
                              follower.permissions.includes('user')
                                ? `/klader/${follower.username}`
                                : `/page/${follower.username}`
                            }
                          >{`${follower.firstname} ${follower.lastname}`}</Link>
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  {data &&
                    data.discoverUsers &&
                    data.discoverUsers.map((follower: User) => (
                      <Box key={follower.username} sx={{ mb: 2 }}>
                        <Stack
                          direction="row"
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <IconButton sx={{ my: 'auto' }}>
                            <Avatar
                              alt="Avatar"
                              sx={{ width: 30, height: 30 }}
                              src={follower.profilePictureUrl}
                            />
                          </IconButton>
                          <Typography
                            fontWeight={500}
                            fontSize={14}
                            textTransform="capitalize"
                          >
                            <Link
                              preventScrollReset={false}
                              style={{ textDecoration: 'none', color: 'black' }}
                              to={
                                follower.permissions.includes('user')
                                  ? `/klader/${follower.username}`
                                  : `/page/${follower.username}`
                              }
                            >{`${follower.firstname} ${follower.lastname}`}</Link>
                          </Typography>
                        </Stack>
                      </Box>
                    ))}
                </CustomTabPanel>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Kladers;
