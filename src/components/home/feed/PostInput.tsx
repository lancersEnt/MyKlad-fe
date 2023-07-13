import React, { ReactElement } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

// Icons
import PhotoIcon from '@mui/icons-material/Photo';
import LinkIcon from '@mui/icons-material/Link';
import NoteIcon from '@mui/icons-material/Note';
import EmojiIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import PublicIcon from '@mui/icons-material/Public';
import ShowMoreIcon from '@mui/icons-material/ExpandMore';
// custom components
import CustomTextField from '../../common/inputs/CustomTextField';

const CREATE_POST = gql`
  mutation ($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      id
      content
      authorId
      createdAt
      updatedAt
      user {
        id
        firstname
      }
    }
  }
`;

function PostInput(): ReactElement {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState('');
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

  const [createPost, { loading, error, data }] = useMutation(CREATE_POST, {
    onCompleted() {
      setOpen(false);
    },
  });

  const handleCreatePost = async () => {
    await createPost({
      variables: {
        createPostInput: {
          content: 'Bonjour la vie',
          authorId: '',
        },
      },
    });
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
        <DialogTitle textAlign="center">Créer un post</DialogTitle>
        <Divider />
        <DialogContent>
          <Stack direction="row" spacing={2} mb={2}>
            <Avatar
              src=""
              alt="profile-avatar"
              sx={{ width: '4rem', height: '4rem' }}
            />
            <Stack spacing={2}>
              <Typography component="h3" fontSize={16} fontWeight={500}>
                Ghassen Saaf
              </Typography>
              <Button
                sx={{ borderRadius: 25 }}
                variant="contained"
                size="small"
                color="secondary"
              >
                <PublicIcon />
                <Typography fontSize={12} textTransform="none">
                  Tout le monde
                </Typography>
                <ShowMoreIcon />
              </Button>
            </Stack>
          </Stack>
          <CustomTextField
            placeholder="Ecrivez un commentaire ... "
            multiline
            fullWidth
            variant="filled"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            InputProps={{
              hiddenLabel: true,
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <EmojiIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions sx={{ py: 2 }}>
          <Button
            sx={{ borderRadius: 25 }}
            variant="contained"
            onClick={handleCreatePost}
          >
            Publier
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
export default PostInput;
