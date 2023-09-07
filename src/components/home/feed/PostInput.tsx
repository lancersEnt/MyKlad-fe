/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable default-case */
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
  IconButton,
  InputAdornment,
  Menu,
  Stack,
  Typography,
} from '@mui/material';

// Icons
import PhotoIcon from '@mui/icons-material/Photo';
import VideoIcon from '@mui/icons-material/VideoCameraBack';
import EmojiIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import PdfIcon from '@mui/icons-material/PictureAsPdf';

// custom components
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { Close } from '@mui/icons-material';
import CustomTextField from '../../common/inputs/CustomTextField';
import { RootState } from '../../../app/store';
import { CREATE_POST } from '../../../utils/GraphQL/Mutations';

const uploader = Uploader({ apiKey: 'public_W142iCzFqiJEacLzJCW4KQsGvEFm' }); // Your real API key.

function PostInput(): ReactElement {
  const [type, setType] = useState('text');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openEmojiMenu = Boolean(anchorEl);
  const [content, setContent] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [documentURL, setDocumentURL] = useState('');
  const user = useSelector((state: RootState) => state.auth.user);

  const [createPost] = useMutation(CREATE_POST, {
    onCompleted() {
      setType('text');
      setContent('');
      setImageURL('');
      setVideoURL('');
      setDocumentURL('');
    },
  });
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const handleCreatePost = async () => {
    if (type === 'text' && content.length > 3) {
      const matches = content.match(youtubeRegex);
      if (matches) {
        setType('video');
        setVideoURL(matches[0]);
        await createPost({
          variables: {
            createPostInput: {
              content: content.replace(matches[0], ''),
              type: 'video',
              videoUrl: matches[0],
              authorId: '',
            },
          },
        });
      } else
        await createPost({
          variables: {
            createPostInput: {
              content,
              type,
              authorId: '',
            },
          },
        });
    } else if (content.length > 3 || imageURL !== '' || videoURL !== '') {
      switch (type) {
        case 'image':
          await createPost({
            variables: {
              createPostInput: {
                content,
                type,
                imageUrl: imageURL,
                authorId: '',
              },
            },
          });
          break;
        case 'video':
          await createPost({
            variables: {
              createPostInput: {
                content,
                type,
                videoUrl: videoURL,
                authorId: '',
              },
            },
          });
          break;
        case 'document':
          await createPost({
            variables: {
              createPostInput: {
                content,
                type,
                documentUrl: documentURL,
                authorId: '',
              },
            },
          });
          break;
      }
    }
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
      id="post-input"
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
        </Typography>
      </Stack>
      <Box>
        <CustomTextField
          placeholder="Quoi de neuf ?"
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
          <Stack direction="row" spacing={1}>
            <UploadButton
              uploader={uploader}
              options={{
                showRemoveButton: true,
                multi: false,
                mimeTypes: ['image/jpeg', 'image/png'],
              }}
              onComplete={(files) => {
                setType('image');
                setImageURL(files[0].fileUrl);
              }}
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
            <UploadButton
              uploader={uploader}
              options={{
                showRemoveButton: true,
                multi: false,
                mimeTypes: ['video/mp4'],
              }}
              onComplete={(files) => {
                setType('video');
                setVideoURL(files[0].fileUrl);
              }}
            >
              {({ onClick }) => (
                <IconButton
                  sx={{
                    backgroundColor: '#F5F6F9',
                  }}
                  onClick={onClick}
                >
                  <VideoIcon />
                </IconButton>
              )}
            </UploadButton>
            <UploadButton
              uploader={uploader}
              options={{
                showRemoveButton: true,
                multi: false,
                mimeTypes: ['application/pdf'],
              }}
              onComplete={(files) => {
                setType('video');
                setVideoURL(files[0].fileUrl);
              }}
            >
              {({ onClick }) => (
                <IconButton
                  sx={{
                    backgroundColor: '#F5F6F9',
                  }}
                  onClick={onClick}
                >
                  <PdfIcon />
                </IconButton>
              )}
            </UploadButton>
          </Stack>
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
