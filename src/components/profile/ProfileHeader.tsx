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

import './header.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import User from '../../utils/Interfaces/User.interface';
import { RootState } from '../../app/store';
import isFollowing from '../../utils/isFollowing';
import UserList from '../common/UserList';

interface ProfileHeaderProps {
  user: User;
  refetch: any;
}

const FOLLOW = gql`
  mutation follow($followInput: FollowInput!) {
    follow(followInput: $followInput)
  }
`;

const UNFOLLOW = gql`
  mutation unfollow($unfollowInput: UnfollowInput!) {
    unfollow(unfollowInput: $unfollowInput)
  }
`;
function ProfileHeader({ user, refetch }: ProfileHeaderProps) {
  const authUser = useSelector((state: RootState) => state.auth.user);
  const [follow] = useMutation(FOLLOW);
  const [unfollow] = useMutation(UNFOLLOW);
  const [collapsed, setCollapsed] = useState(true);
  const [following, setFollowing] = useState(
    isFollowing(user.username, authUser.following)
  );

  const [userListIsOpen, setUserListIsOpen] = useState(false);
  const [usersList, setUsersList]: any[] = useState([]);
  const [UserListTitle, setUserListTitle] = useState('');

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleFollowButton = () => {
    if (!following) {
      follow({
        variables: {
          followInput: {
            targetUserId: user.id,
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
            targetUserId: user.id,
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
            src={user.profilePictureUrl}
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
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={`/klader/${user.username}`}
                  >
                    {`${user.firstname} ${user.lastname}`}
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
                  {user.permissions.includes('expert')
                    ? 'Kladeur expert'
                    : 'Kladeur'}
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
                direction="row-reverse"
                spacing={1}
                display={user.id === authUser.id ? 'none' : 'flex'}
              >
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
                <Button
                  onClick={handleFollowButton}
                  variant={following ? 'outlined' : 'contained'}
                  sx={{ borderRadius: 25, px: '2rem' }}
                  // disabled={following}
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
                  5 invesstissements
                </Typography>
                <Typography
                  onClick={() => {
                    setUserListTitle('Abonnées');
                    setUsersList(user.followers);
                    setUserListIsOpen(true);
                  }}
                  fontSize={{ xs: 13, xl: 14 }}
                  gutterBottom
                >
                  {user.followers.length} Abonnées
                </Typography>
                <Typography
                  onClick={() => {
                    setUserListTitle('Abbonnements');
                    setUsersList(user.following);
                    setUserListIsOpen(true);
                  }}
                  fontSize={{ xs: 13, xl: 14 }}
                  gutterBottom
                >
                  {user.following.length} Abbonnements
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
      <UserList
        users={usersList}
        title={UserListTitle}
        open={userListIsOpen}
        setOpen={setUserListIsOpen}
      />
    </Box>
  );
}
export default ProfileHeader;
