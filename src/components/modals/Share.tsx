/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Menu,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { useMutation } from '@apollo/client';

import { useState } from 'react';
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { EmojiEmotionsOutlined } from '@mui/icons-material';
import CustomTextField from '../common/inputs/CustomTextField';
import { CREATE_POST } from '../../utils/GraphQL/Mutations';

interface ShareProps {
  open: boolean;
  handleClose: any;
  postId?: string;
  kladId?: string;
}

function Share({ open, handleClose, postId, kladId }: ShareProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [content, setContent] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openEmojiMenu = Boolean(anchorEl);

  const handleEmoji = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseEmojiMenu = () => {
    setAnchorEl(null);
  };

  const addEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
    setContent(`${content}${emojiData.emoji} `);
  };

  const [createPost] = useMutation(CREATE_POST, {
    onCompleted() {
      setContent('');
    },
  });

  const handleCreatePost = async () => {
    if (postId)
      await createPost({
        variables: {
          createPostInput: {
            content,
            type: 'shared-post',
            postId,
            authorId: '',
          },
        },
      });
    if (kladId)
      await createPost({
        variables: {
          createPostInput: {
            content,
            type: 'shared-klad',
            kladId,
            authorId: '',
          },
        },
        onCompleted() {
          handleClose();
        },
      });
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{
        style: {
          width: '450px',
        },
      }}
    >
      <DialogTitle id="responsive-dialog-title">
        <Typography
          textAlign="center"
          gutterBottom
          variant="h5"
          fontWeight={500}
        >
          Partager {kladId ? 'klad' : 'publication'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          {/* Input Prenom  */}
          <Box>
            <CustomTextField
              placeholder="Ajouter quelque chose ?"
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
                      <EmojiEmotionsOutlined />
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
          </Box>

          <Button
            size="large"
            sx={{ borderRadius: '50px', textTransform: 'unset' }}
            variant="contained"
            onClick={handleCreatePost}
          >
            <Typography py=".5rem" fontSize=".8rem">
              Partager
            </Typography>
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
export default Share;
