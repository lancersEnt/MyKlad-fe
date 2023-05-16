import React, { ReactElement } from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

// Icons
import PhotoIcon from '@mui/icons-material/Photo';
import LinkIcon from '@mui/icons-material/Link';
import NoteIcon from '@mui/icons-material/Note';

function PostInput(): ReactElement {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [postType, setPostType] = React.useState<string>('');
  const handleClickOpen = (type: string) => {
    setPostType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setPostType('');
    setOpen(false);
  };
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        px: 3,
        py: 2,
        mb: 2,
        borderRadius: 3,
        boxShadow: 1,
      }}
    >
      <Stack direction="row" spacing={2}>
        <Avatar src="" alt="user-avatar" />
        <Box>
          <Typography fontSize={20} fontWeight={400} lineHeight={2} mb={3}>
            Que voulez-vous poster?
          </Typography>
          <Stack direction="row" spacing={2}>
            <IconButton
              sx={{
                backgroundColor: '#F5F6F9',
              }}
              onClick={() => handleClickOpen('note')}
            >
              <NoteIcon />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: '#F5F6F9',
              }}
              onClick={() => handleClickOpen('image')}
            >
              <PhotoIcon />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: '#F5F6F9',
              }}
              onClick={() => handleClickOpen('link')}
            >
              <LinkIcon />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: 'white',
            borderRadius: 3,
            width: { md: '500px', lg: '750px' },
            px: 3,
          },
        }}
      >
        <DialogTitle>Créer un post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions sx={{ py: 2 }}>
          <Button
            sx={{ borderRadius: 25 }}
            variant="contained"
            onClick={handleClose}
          >
            Publier
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
export default PostInput;
