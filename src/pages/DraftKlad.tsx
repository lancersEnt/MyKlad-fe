/* eslint-disable react/require-default-props */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  Menu,
  Stack,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { FormEvent, useRef, useState } from 'react';
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import EmojiIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import {
  ChatBubbleOutline,
  CloseOutlined,
  SendRounded,
} from '@mui/icons-material';
import { RootState } from '../app/store';
import Unauthorized from './Errors/Unauthorized';
import DraftKladHeader from '../components/draftKlad/DraftKladHeader';
import DraftKladBody from '../components/draftKlad/DraftKladBody';
import { GET_KLAD } from '../utils/GraphQL/Queries';
import { CREATE_MESSAGE, UPDATE_KLAD } from '../utils/GraphQL/Mutations';
import Messages from '../components/KladReview/Messages';
import CustomTextField from '../components/common/inputs/CustomTextField';
import { DrawerHeader } from '../components/common/navigation/Sidebar';

function DraftKlad() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { kladId } = useParams();

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [dialogData, setDialogData] = useState('');
  const [updateKlad] = useMutation(UPDATE_KLAD);
  const handleOpenDialog = (dialogContent: string) => {
    setDialogData(dialogContent);
    setIsOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogData('');
    setIsOpen(false);
  };

  const handleDownload = (fileUrl: string, filename: string) => {
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `klad_chat_history_id_${filename}.txt`; // Specify the desired file name here
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error('Error downloading file:', error));
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

  const addEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
    setContent(`${content}${emojiData.emoji} `);
  };

  const [createMessge] = useMutation(CREATE_MESSAGE);

  if (
    user.klads.filter((k) => k.id === kladId && (k.isDraft || k.isRejected))
      .length > 0
  ) {
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
      <Box>
        {loading && <Typography>Loading .. </Typography>}
        {data && !loading && (
          <>
            {data.klad.isDraft && (
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
            <Box
              sx={{
                position: 'sticky',
                top: 57,
                px: 0.35,
                py: 2,
                zIndex: 9,
                '::before': {
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  width: '100vw',
                  right: 'calc(50% - 50vw)', // Adjust this to center the background
                  left: 'calc(50% - 50vw)', // Adjust this to center the background
                  top: 0,
                  bottom: 0,
                  content: "''",
                  position: 'absolute',
                  zIndex: -1,
                },
              }}
            >
              <Stack direction="row-reverse" spacing={2}>
                {data.klad.isDraft && (
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ borderRadius: 5, textTransform: 'none' }}
                    onClick={() => {
                      handleOpenDialog(data.klad.inReview ? 'save' : 'submit');
                    }}
                  >
                    {data.klad.inReview
                      ? 'enregistrer les modification'
                      : "soumettre à l'expertise"}
                  </Button>
                )}
                {!data.klad.isDraft && (
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ borderRadius: 5, textTransform: 'none' }}
                    onClick={() => {
                      handleDownload(
                        data.klad.archivedMessagesUrl,
                        data.klad.id
                      );
                    }}
                  >
                    Telecharger l&apos;historique de chat
                  </Button>
                )}
              </Stack>
            </Box>
            <Drawer
              PaperProps={{
                sx: {
                  backgroundColor: '#FFF',
                  width: '550px',
                },
              }}
              anchor="right"
              open={chatIsOpen}
              onClose={handleCloseChat}
            >
              <Box
                sx={{
                  height: '100%',
                  width: '100%',
                  overflowY: 'auto',
                }}
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
            <Box
              component="main"
              sx={{
                flexGrow: 1,
              }}
            >
              <DraftKladHeader klad={data.klad} refetch={refetch} />
              <DraftKladBody klad={data.klad} refetch={refetch} />
              <Dialog open={isOpen} onClose={() => handleCloseDialog()}>
                <DialogTitle>
                  {dialogData === 'submit'
                    ? "Soumettre Klad a l'expertise"
                    : 'Enregistrer les modification'}
                </DialogTitle>
                <DialogContent>
                  <Box px={2}>
                    {dialogData === 'submit' ? (
                      <Typography component="p">
                        Voulez-vous vraiment soumettre ce Klad a
                        l&apos;expertise ?
                        <br />
                        Assurez-vous d&apos;inclure toutes les informations et
                        documents appropriés avant de continuer
                      </Typography>
                    ) : (
                      <Typography component="p">
                        les nouvelles informations que vous avez fournies seront
                        vues par des experts.
                        <br />
                        assurez-vous d&apos;inclure les informations demandées
                        par les experts s&apos;ils l&apos;ont demandé.
                      </Typography>
                    )}
                  </Box>
                </DialogContent>
                <Divider />
                <DialogActions>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                  >
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      sx={{ textTransform: 'none', borderRadius: 5 }}
                      onClick={() => handleCloseDialog()}
                    >
                      Annuler
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{ textTransform: 'none', borderRadius: 5 }}
                      onClick={() => {
                        updateKlad({
                          variables: {
                            updateKladId: kladId,
                            updateKladInput: {
                              inReview: true,
                            },
                          },
                        });
                        handleCloseDialog();
                      }}
                    >
                      {data.klad.inReview ? 'Enregistrer' : 'Soumettre'}
                    </Button>
                  </Stack>
                </DialogActions>
              </Dialog>
            </Box>
          </>
        )}
      </Box>
    );
  }
  return <Unauthorized />;
}
export default DraftKlad;
