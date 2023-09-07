/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/require-default-props */
import { FormEvent, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  InputAdornment,
  Menu,
  Stack,
  Typography,
} from '@mui/material';

import EmojiIcon from '@mui/icons-material/EmojiEmotionsOutlined';

import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {
  ChatBubbleOutline,
  CloseOutlined,
  SendRounded,
} from '@mui/icons-material';
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { useSelector } from 'react-redux';
import KladReviewHeader from './KladReviewHeader';
import { GET_KLAD } from '../../utils/GraphQL/Queries';
import Messages from './Messages';
import { RootState } from '../../app/store';
import CustomTextField from '../common/inputs/CustomTextField';
import { CREATE_MESSAGE } from '../../utils/GraphQL/Mutations';
import KladTabs from './KladTabs';
import { Klad } from '../../utils/Interfaces/Klad.interface';

const drawerWidth = 550;
interface ChatDrawerProps {
  isActive: boolean;
  klad: Klad | null;
}
function ChatDrawer({ isActive, klad }: ChatDrawerProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { kladId } = useParams();
  const { data, loading, refetch } = useQuery(GET_KLAD, {
    variables: { kladId },
  });

  const [chatIsOpen, setChatIsOpen] = useState(false);
  const handleCloseChat = () => {
    setChatIsOpen(false);
    refetch();
  };
  const handleOpenChat = () => {
    setChatIsOpen(true);
    refetch();
  };

  const [content, setContent] = useState('');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openEmojiMenu = Boolean(anchorEl);
  const handleEmoji = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseEmojiMenu = () => {
    setAnchorEl(null);
  };

  const addEmoji = (emojiData: EmojiClickData) => {
    setContent(`${content}${emojiData.emoji} `);
  };

  const [createMessge] = useMutation(CREATE_MESSAGE);

  const handleCreateMessage = (e: FormEvent) => {
    e.preventDefault();
    if (content !== '')
      createMessge({
        variables: {
          createMessageInput: {
            kladId: data.klad.id,
            content,
            authorId: user.id,
          },
        },
        onCompleted() {
          setContent('');
        },
      });
  };

  return (
    <Container>
      {isActive && (
        <IconButton
          sx={{
            backgroundColor: '#305CE9',
            position: 'fixed',
            bottom: 100,
            right: 20,
            zIndex: 99,
            p: 2,
          }}
          onClick={handleOpenChat}
        >
          <ChatBubbleOutline sx={{ color: '#fff' }} />
        </IconButton>
      )}
      <CssBaseline />
      {loading && <Typography>Loading ...</Typography>}
      {!loading && data && (
        <>
          {isActive && (
            <Box
              component="nav"
              sx={{
                width: { sm: drawerWidth },
                // flexShrink: { sm: 0 },
                // position: 'sticky', // Set the position to sticky
                // top: 0, // Stick to the top of the containing element
              }}
              aria-label="mailbox folders"
            >
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Drawer
                PaperProps={{
                  sx: {
                    backgroundColor: '#FFF',
                    maxWidth: '550px',
                  },
                }}
                anchor="right"
                onClose={handleCloseChat}
                open={chatIsOpen}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: '100%',
                    overflowY: 'auto', // Add this to enable scrolling
                  }}
                  id="drawer-box"
                  ref={messagesContainerRef}
                >
                  <Box
                    p={1}
                    sx={{
                      position: 'sticky',
                      top: 57,
                      backgroundColor: '#e0e0e0a0',
                      zIndex: 5,
                      p: 2,
                    }}
                  >
                    <Stack direction="row-reverse">
                      <IconButton
                        sx={{
                          backgroundColor: '#305CE9',
                        }}
                        onClick={handleCloseChat}
                      >
                        <CloseOutlined sx={{ color: '#fff' }} />
                      </IconButton>
                    </Stack>
                  </Box>
                  <Messages
                    messages={data.klad.messages}
                    boxRef={messagesContainerRef}
                  />
                  <Box
                    p={1}
                    sx={{
                      position: 'sticky',
                      bottom: 0,
                      backgroundColor: '#e0e0e0',
                    }}
                  >
                    <form onSubmit={(e) => handleCreateMessage(e)}>
                      <Stack
                        direction="row"
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <IconButton sx={{ my: 'auto' }}>
                          <Avatar alt="Avatar" src={user.profilePictureUrl} />
                        </IconButton>
                        <CustomTextField
                          sx={{
                            my: 'auto',
                            width: '100%',
                            backgroundClip: 'white',
                          }}
                          autoComplete="off"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="Ecrivez un commentaire ... "
                          variant="filled"
                          InputProps={{
                            hiddenLabel: true,
                            disableUnderline: true,
                            style: { backgroundColor: '#FFF' },
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-controls={
                                    openEmojiMenu ? 'emoji-menu' : undefined
                                  }
                                  aria-haspopup="true"
                                  aria-expanded={
                                    openEmojiMenu ? 'true' : undefined
                                  }
                                  onClick={handleEmoji}
                                  edge="end"
                                >
                                  <EmojiIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
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
                        <IconButton sx={{ my: 'auto' }} type="submit">
                          <SendRounded />
                        </IconButton>
                      </Stack>
                    </form>
                  </Box>
                </Box>
              </Drawer>
            </Box>
          )}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              order: -1, // Adjust the order for different screen sizes
              height: '5000px',
            }}
          >
            <KladReviewHeader klad={data.klad} />
            <KladTabs klad={klad} />
          </Box>
        </>
      )}
    </Container>
  );
}
export default ChatDrawer;
