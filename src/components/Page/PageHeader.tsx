import React, { useState } from 'react';

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

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import UserList from '../common/UserList';
import User from '../../utils/Interfaces/User.interface';
import { RootState } from '../../app/store';
import isFollowing from '../../utils/isFollowing';
import { FOLLOW, UNFOLLOW } from '../../utils/GraphQL/Mutations';

interface PageHeaderProps {
  page: User;
  refetch: any;
}

function PageHeader({ page, refetch }: PageHeaderProps) {
  const authUser = useSelector((state: RootState) => state.auth.user);

  const [follow] = useMutation(FOLLOW);
  const [unfollow] = useMutation(UNFOLLOW);

  const [collapsed, setCollapsed] = useState(true);

  const [userListIsOpen, setUserListIsOpen] = useState(false);
  const [usersList, setUsersList]: any[] = useState([]);
  const [UserListTitle, setUserListTitle] = useState('');

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const [following, setFollowing] = useState(
    isFollowing(page.username, authUser.following)
  );
  const handleFollowButton = () => {
    if (!following) {
      follow({
        variables: {
          followInput: {
            targetUserId: page.id,
          },
        },
        onCompleted() {
          refetch();
          setFollowing(true);
        },
      });
    }
    if (following) {
      unfollow({
        variables: {
          unfollowInput: {
            targetUserId: page.id,
          },
        },
        onCompleted() {
          refetch();
          setFollowing(false);
        },
      });
    }
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
            src={page.profilePictureUrl}
          />
        </Grid>
        <Grid item xs={12} md={9.5}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              md={4}
              display={{
                xs: 'flex',
                sm: 'flex',
                md: 'flex',
                lg: 'block',
              }}
              alignItems="center"
              justifyContent={{
                xs: 'center',
                sm: 'center',
                md: 'center',
                lg: 'start',
              }}
            >
              <Stack>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  textTransform="capitalize"
                  sx={{
                    textAlign: {
                      sx: 'center',
                      sm: 'center',
                      md: 'left',
                      lg: 'left',
                    },
                  }}
                >
                  <Link
                    preventScrollReset={false}
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={
                      page.permissions.includes('user')
                        ? `/klader/${page.username}`
                        : `/page/${page.username}`
                    }
                  >
                    {`${page.firstname} ${page.lastname}`}
                  </Link>
                </Typography>
                <Typography
                  color="secondary"
                  variant="caption"
                  component="h2"
                  gutterBottom
                  sx={{
                    textAlign: {
                      xs: 'center',
                      sm: 'center',
                      md: 'left',
                      lg: 'left',
                    },
                  }}
                >
                  Page/Association/Entreprise
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
              <Stack direction="row-reverse" spacing={1}>
                {/* <IconButton
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
                </IconButton> */}
                <Button
                  onClick={handleFollowButton}
                  variant={following ? 'outlined' : 'contained'}
                  sx={{ borderRadius: 25, px: '2rem' }}
                >
                  {following ? 'Abonné' : "s'abonné"}
                </Button>
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
                  {page.klads.length} Projets
                </Typography>
                <Typography
                  onClick={() => {
                    setUserListTitle('Abonnés');
                    setUsersList(page.followers);
                    setUserListIsOpen(true);
                  }}
                  fontSize={{ xs: 13, xl: 14 }}
                  gutterBottom
                >
                  {page.followers.length} Abonnés
                </Typography>
                <Typography
                  onClick={() => {
                    setUserListTitle('Abbonnements');
                    setUsersList(page.following);
                    setUserListIsOpen(true);
                  }}
                  fontSize={{ xs: 13, xl: 14 }}
                  gutterBottom
                >
                  {page.following.length} Abbonnements
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <UserList
        users={usersList}
        title={UserListTitle}
        open={userListIsOpen}
        setOpen={setUserListIsOpen}
      />
    </Box>
  );
}
export default PageHeader;
