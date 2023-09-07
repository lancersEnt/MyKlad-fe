/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import PublicationsIcon from '@mui/icons-material/ArticleOutlined';
import AboutIcon from '@mui/icons-material/InfoOutlined';
import InvestIcon from '@mui/icons-material/LocalAtmOutlined';
import PagesIcon from '@mui/icons-material/FileCopyOutlined';
import {
  CasesOutlined,
  PeopleOutline,
  PeopleOutlined,
} from '@mui/icons-material';
import { useQuery } from '@apollo/client';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  KLAD_SEARCH,
  POST_SEARCH,
  USER_SEARCH,
} from '../../utils/GraphQL/Queries';
import KladEntry from '../common/KladEntry';
import { Klad } from '../../utils/Interfaces/Klad.interface';
import Post from '../../utils/Interfaces/Post.Interface';
import Publication from '../home/feed/Publication';
import User from '../../utils/Interfaces/User.interface';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function SearchTabs() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q');
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data: usersResults, loading: usersSearchLoading } = useQuery(
    USER_SEARCH,
    { variables: { text: query } }
  );
  const { data: postsResults, loading: postsSearchLoading } = useQuery(
    POST_SEARCH,
    { variables: { text: query } }
  );
  const { data: kladsResults, loading: kladsSearchLoading } = useQuery(
    KLAD_SEARCH,
    { variables: { text: query } }
  );

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          <Tab
            iconPosition="start"
            label="Tous"
            sx={{ marginRight: '1rem' }}
            {...a11yProps(0)}
          />
          <Tab
            icon={<PeopleOutlined />}
            iconPosition="start"
            label="Utilisateurs"
            sx={{ marginRight: '1rem' }}
            {...a11yProps(1)}
          />
          <Tab
            icon={<CasesOutlined />}
            iconPosition="start"
            label="Klads"
            sx={{ marginRight: '1rem' }}
            {...a11yProps(2)}
          />
          <Tab
            icon={<PagesIcon />}
            iconPosition="start"
            label="Pages"
            sx={{ marginRight: '1rem' }}
            {...a11yProps(3)}
          />
          <Tab
            icon={<PublicationsIcon />}
            iconPosition="start"
            label="Publications"
            sx={{ marginRight: '1rem' }}
            {...a11yProps(4)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {usersResults &&
          usersResults.searchForUsers.filter((user: User) =>
            user.permissions.includes('user')
          ).length > 0 && (
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
              >
                <Typography fontWeight={500}>Utilisateurs </Typography>
                <Button
                  sx={{ textTransform: 'none', borderRadius: 5 }}
                  variant="outlined"
                  onClick={() => setValue(1)}
                >
                  Afficher tous {}
                </Button>
              </Stack>
              <Grid container spacing={2} mb={3}>
                {usersResults &&
                  usersResults.searchForUsers
                    .filter((user: User) => user.permissions.includes('user'))
                    .slice(0, 2)
                    .map((user: User) => (
                      <Grid key={user.id} item xs={12} md={6}>
                        <Box
                          sx={{
                            p: 2,
                            mb: 2,
                            boxShadow: 1,
                            borderRadius: 2,
                            backgroundColor: '#fff',
                          }}
                        >
                          <Stack
                            direction="row"
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            <IconButton sx={{ my: 'auto' }}>
                              <Avatar
                                alt="Avatar"
                                sx={{ width: 40, height: 40 }}
                                src={user.profilePictureUrl}
                              />
                            </IconButton>
                            <Typography
                              fontWeight={500}
                              fontSize={14}
                              textTransform="capitalize"
                            >
                              <Link
                                preventScrollReset={false}
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
                        </Box>
                      </Grid>
                    ))}
              </Grid>
            </Box>
          )}
        {kladsResults && kladsResults.searchForKlads.length > 0 && (
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
            >
              <Typography fontWeight={500}>Klads</Typography>
              <Button
                sx={{ textTransform: 'none', borderRadius: 5 }}
                variant="outlined"
                onClick={() => setValue(2)}
              >
                Afficher tous
              </Button>
            </Stack>

            <Grid container spacing={2} mb={3}>
              {kladsResults &&
                kladsResults.searchForKlads.map((klad: Klad) => (
                  <KladEntry key={klad.id} klad={klad} />
                ))}
            </Grid>
          </Box>
        )}
        {usersResults &&
          usersResults.searchForUsers.filter((user: User) =>
            user.permissions.includes('page')
          ).length > 0 && (
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
              >
                <Typography fontWeight={500}>Pages</Typography>
                <Button
                  sx={{ textTransform: 'none', borderRadius: 5 }}
                  variant="outlined"
                  onClick={() => setValue(3)}
                >
                  Afficher tous
                </Button>
              </Stack>
              <Grid container spacing={2} mb={3}>
                {usersResults &&
                  usersResults.searchForUsers
                    .filter((user: User) => user.permissions.includes('page'))
                    .slice(0, 2)
                    .map((user: User) => (
                      <Grid key={user.id} item xs={12} md={6}>
                        <Box
                          sx={{
                            p: 2,
                            mb: 2,
                            boxShadow: 1,
                            borderRadius: 2,
                            backgroundColor: '#fff',
                          }}
                        >
                          <Stack
                            direction="row"
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            <IconButton sx={{ my: 'auto' }}>
                              <Avatar
                                alt="Avatar"
                                sx={{ width: 40, height: 40 }}
                                src={user.profilePictureUrl}
                              />
                            </IconButton>
                            <Typography
                              fontWeight={500}
                              fontSize={14}
                              textTransform="capitalize"
                            >
                              <Link
                                preventScrollReset={false}
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
                        </Box>
                      </Grid>
                    ))}
              </Grid>
            </Box>
          )}
        {postsResults && postsResults.searchForPosts.length > 0 && (
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
            >
              <Typography fontWeight={500}>Publications</Typography>
              <Button
                sx={{ textTransform: 'none', borderRadius: 5 }}
                variant="outlined"
                onClick={() => setValue(4)}
              >
                Afficher tous
              </Button>
            </Stack>

            {postsResults &&
              postsResults.searchForPosts
                .slice(0, 3)
                .map((post: Post) => <Publication key={post.id} post={post} />)}
          </Box>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={2}>
          {usersResults &&
            usersResults.searchForUsers
              .filter((user: User) => user.permissions.includes('user'))
              .map((user: User) => (
                <Grid key={user.id} item xs={12} md={6}>
                  <Box
                    sx={{
                      p: 2,
                      mb: 2,
                      boxShadow: 1,
                      borderRadius: 2,
                      backgroundColor: '#fff',
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <IconButton sx={{ my: 'auto' }}>
                        <Avatar
                          alt="Avatar"
                          sx={{ width: 40, height: 40 }}
                          src={user.profilePictureUrl}
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
                            user.permissions.includes('user')
                              ? `/klader/${user.username}`
                              : `/page/${user.username}`
                          }
                        >{`${user.firstname} ${user.lastname}`}</Link>
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
              ))}
        </Grid>
        {usersResults &&
          usersResults.searchForUsers.filter((user: User) =>
            user.permissions.includes('user')
          ).length === 0 && (
            <Typography>
              aucun utilisateur ne correspond à votre requête de recherche
            </Typography>
          )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container spacing={2}>
          {kladsResults &&
            kladsResults.searchForKlads.map((klad: Klad) => (
              <KladEntry key={klad.id} klad={klad} />
            ))}
          {kladsResults && kladsResults.searchForKlads.length === 0 && (
            <Typography>
              aucun Klad ne correspond à votre requête de recherche
            </Typography>
          )}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Grid container spacing={2}>
          {usersResults &&
            usersResults.searchForUsers
              .filter((user: User) => user.permissions.includes('page'))
              .map((user: User) => (
                <Grid key={user.id} item xs={12} md={6}>
                  <Box
                    sx={{
                      p: 2,
                      mb: 2,
                      boxShadow: 1,
                      borderRadius: 2,
                      backgroundColor: '#fff',
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <IconButton sx={{ my: 'auto' }}>
                        <Avatar
                          alt="Avatar"
                          sx={{ width: 40, height: 40 }}
                          src={user.profilePictureUrl}
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
                            user.permissions.includes('user')
                              ? `/klader/${user.username}`
                              : `/page/${user.username}`
                          }
                        >{`${user.firstname} ${user.lastname}`}</Link>
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
              ))}
        </Grid>
        {usersResults &&
          usersResults.searchForUsers.filter((user: User) =>
            user.permissions.includes('page')
          ).length === 0 && (
            <Typography>
              aucune page ne correspond à votre requête de recherche
            </Typography>
          )}
      </TabPanel>
      <TabPanel value={value} index={4}>
        {postsResults &&
          postsResults.searchForPosts.map((post: Post) => (
            <Publication key={post.id} post={post} />
          ))}
        {postsResults && postsResults.searchForPosts.length === 0 && (
          <Typography>
            aucune publication ne correspond à votre requête de recherche
          </Typography>
        )}
      </TabPanel>
    </Box>
  );
}
export default SearchTabs;
