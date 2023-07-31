import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface UserListProps {
  users: any[];
  title: string;
  open: boolean;
  setOpen: any;
}
function UserList({ users, title, open, setOpen }: UserListProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          style: {
            padding: 2,
            borderRadius: '1rem',
            minWidth: '300px',
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title" sx={{ textAlign: 'center' }}>
          {title}
        </DialogTitle>
        <Divider />
        <DialogContent>
          {users.map((user) => (
            <Box key={user.username} sx={{ mb: 2 }}>
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
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={`/klader/${user.username}`}
                  >{`${user.firstname} ${user.lastname}`}</Link>
                </Typography>
              </Stack>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>fermer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserList;
