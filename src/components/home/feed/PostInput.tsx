/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement, useState, useRef } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';
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
  Menu,
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
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { Close } from '@mui/icons-material';
import CustomTextField from '../../common/inputs/CustomTextField';
import { RootState } from '../../../app/store';

const uploader = Uploader({ apiKey: 'public_kW15bZn8U7vFK5hjt2GgJgDvGkLy' }); // Your real API key.

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
        username
      }
    }
  }
`;

function PostInput(): ReactElement {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openEmojiMenu = Boolean(anchorEl);
  const [content, setContent] = useState('');
  const [imageURL, setImageURL] = useState('');
  const user = useSelector((state: RootState) => state.auth.user);

  const [createPost] = useMutation(CREATE_POST, {
    onCompleted() {
      setImageURL('');
      setContent('');
    },
  });

  const handleCreatePost = async () => {
    if (content.length > 3 || imageURL !== '')
      await createPost({
        variables: {
          createPostInput: {
            content,
            imageUrl: imageURL,
            authorId: '',
          },
        },
      });
  };

  const handleEmoji = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseEmojiMenu = () => {
    setAnchorEl(null);
  };

  const addEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
    setContent(`${content}${emojiData.emoji} `);
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
      <Stack
        direction="row"
        spacing={2}
        mb={2}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Avatar src={user.profilePictureUrl} alt="user-avatar" />
        <Typography
          component="h3"
          fontSize={16}
          fontWeight={500}
          textTransform="capitalize"
        >
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to={`/klader/${user.username}`}
          >
            {`${user.firstname} ${user.lastname}`}
          </Link>
        </Typography>
      </Stack>
      <Box>
        <CustomTextField
          placeholder="Ecrivez un commentaire ... "
          multiline
          fullWidth
          autoFocus
          variant="filled"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          InputProps={{
            hiddenLabel: true,
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-controls={openEmojiMenu ? 'emoji-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openEmojiMenu ? 'true' : undefined}
                  onClick={handleEmoji}
                  edge="end"
                >
                  <EmojiIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <Menu
          id="emoji-menu"
          anchorEl={anchorEl}
          open={openEmojiMenu}
          onClose={handleCloseEmojiMenu}
          PaperProps={{
            style: {
              borderRadius: '.5rem',
            },
          }}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
            style: {
              padding: 0,
            },
          }}
          sx={{ p: 0 }}
        >
          <EmojiPicker
            emojiStyle={EmojiStyle.NATIVE}
            onEmojiClick={addEmoji}
            searchDisabled
          />
        </Menu>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <UploadButton
            uploader={uploader}
            options={{
              showRemoveButton: true,
              multi: false,
              mimeTypes: ['image/jpeg'],
              // to use on profile picture
              // editor: {
              //   images: {
              //     crop: true,
              //     cropRatio: 1,
              //     cropShape: 'circ',
              //     preview: true,
              //   },
              // },
            }}
            onComplete={(files) => setImageURL(files[0].fileUrl)}
          >
            {({ onClick }) => (
              <IconButton
                sx={{
                  backgroundColor: '#F5F6F9',
                }}
                onClick={onClick}
              >
                <PhotoIcon />
              </IconButton>
            )}
          </UploadButton>
          <Button
            sx={{ borderRadius: 25 }}
            variant="contained"
            onClick={handleCreatePost}
            color="primary"
          >
            Publier
          </Button>
        </Stack>
      </Box>
      {imageURL !== '' && (
        <Box
          sx={{
            position: 'relative',
            display: 'inline-block',
            // backgroundImage: `url(${imageURL})`,
            // backgroundSize: 'contain',
            // backgroundRepeat: 'no-repeat',
            // backgroundPosition: 'center center',
            // width: '125px',
            // height: '250px',

            // mt: 2,
          }}
        >
          <img
            src={imageURL}
            alt=""
            style={{
              maxWidth: '250px',
              border: '2px solid #305CE9',
              borderRadius: '.5rem',
            }}
          />
          <Close
            sx={{
              position: 'absolute',
              right: 10,
              top: 10,
              color: 'white',
              backgroundColor: '#305CE9',
              p: 1,
              zIndex: 20,
              borderRadius: '50%',
              border: '1px solid white',

              width: 30,
              height: 30,
              cursor: 'pointer',
            }}
            onClick={() => setImageURL('')}
          />
          {/* <img src={imageURL} width="150px" alt="postIMG" /> */}
        </Box>
      )}
    </Box>
  );
}
export default PostInput;
