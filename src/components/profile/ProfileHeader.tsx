import React from 'react';

import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MailIcon from '@mui/icons-material/Mail';
import ReplyIcon from '@mui/icons-material/Reply';

import './header.css';

function ProfileHeader() {
  const [collapsed, setCollapsed] = React.useState(true);
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={2.5}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Avatar
            sx={{
              width: '140px',
              height: '140px',
              border: '5px solid',
              borderColor: '#335DE8',
            }}
            alt="avatar"
            src=""
          />
        </Grid>
        <Grid item xs={12} md={9.5}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              md={4}
              display={{ xs: 'flex', sm: 'flex', md: 'flex', lg: 'block' }}
              alignItems="center"
              justifyContent="center"
            >
              <Stack>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  align="center"
                >
                  Ghassen Saaf
                </Typography>
                <Typography
                  color="secondary"
                  variant="caption"
                  component="h2"
                  gutterBottom
                  align="center"
                >
                  Klader debutant
                </Typography>
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              display={{ xs: 'flex', sm: 'flex', md: 'flex', lg: 'block' }}
              alignItems="center"
              justifyContent="center"
              my=".5rem"
            >
              <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: 'space-between' }}
              >
                <Button
                  variant="contained"
                  sx={{ borderRadius: 25, px: '2rem' }}
                >
                  S&apos;abonner
                </Button>
                <Stack direction="row-reverse" spacing={3}>
                  <IconButton
                    sx={{
                      width: '45px',
                      height: '45px',
                      backgroundColor: '#F5F6F9',
                      p: 1,
                      border: '1px solid grey',
                    }}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      width: '45px',
                      height: '45px',
                      backgroundColor: '#F5F6F9',
                      p: 1,
                      border: '1px solid grey',
                    }}
                  >
                    <ReplyIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      width: '45px',
                      height: '45px',
                      backgroundColor: '#F5F6F9',
                      p: 1,
                      border: '1px solid grey',
                    }}
                  >
                    <MailIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt="1rem"
            >
              <Stack direction="row" spacing={{ xs: 2, xl: 12 }}>
                <Typography fontSize={{ xs: 13, xl: 14 }} gutterBottom>
                  5 invesstissements
                </Typography>
                <Typography fontSize={{ xs: 13, xl: 14 }} gutterBottom>
                  53 Abonnées
                </Typography>
                <Typography fontSize={{ xs: 13, xl: 14 }} gutterBottom>
                  426 Abbonnements
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography
            className={collapsed ? 'collapsed text' : 'text'}
            px={{ lg: '5rem' }}
            align="center"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget
            erat molestie sapien rutrum dignissim. In mollis eget elit vel
            condimentum. Cras commodo cursus arcu, eget dictum sapien vehicula
            non. Donec tristique eleifend quam, vel consequat nunc hendrerit a.
            Integer porta augue eu ex dignissim hendrerit non nec felis. Donec
            metus odio, semper ac tincidunt at, congue dignissim eros. Sed
            ligula felis, dignissim non arcu sit amet, gravida ornare leo. Sed
            vel turpis eget mauris finibus tristique. Donec non mollis nisl. In
            aliquam, felis ac facilisis sollicitudin, nulla purus maximus velit,
            et molestie velit quam id libero. Phasellus vulputate diam eu
            feugiat imperdiet. Etiam mi elit, malesuada sed euismod in, pretium
            eu diam. Praesent porttitor a dui ac bibendum. Vestibulum lobortis
            augue a augue tristique placerat.
          </Typography>
          <Typography color="primary" align="center" sx={{ cursor: 'pointer' }}>
            <Button onClick={handleCollapse}>
              {collapsed ? 'Voir plus' : 'Voir moin'}
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
export default ProfileHeader;
