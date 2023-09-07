/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { CloseOutlined, Done } from '@mui/icons-material';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChatDrawer from '../components/KladReview/ChatDrawer';
import { DELETE_KLAD_MESSAGES, UPDATE_KLAD } from '../utils/GraphQL/Mutations';
import { GET_KLAD } from '../utils/GraphQL/Queries';
import createTxtFile from '../utils/createTxtFile';
import basicUpload from '../utils/basicUpload';
import { RootState } from '../app/store';
import Unauthorized from './Errors/Unauthorized';

function KladReview() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { kladId } = useParams();
  const { data, loading, refetch } = useQuery(GET_KLAD, {
    variables: { kladId },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [dialogData, setDialogData] = useState('');
  const handleOpenDialog = (dialogOption: string) => {
    setDialogData(dialogOption);
    setIsOpen(true);
  };
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const [updateKlad] = useMutation(UPDATE_KLAD);
  const [deleteKladMessages] = useMutation(DELETE_KLAD_MESSAGES);
  if (user.permissions.includes('expert'))
    return (
      <Box>
        {data && data.klad.isDraft && (
          <>
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
                <Button
                  variant="contained"
                  color="success"
                  sx={{ borderRadius: 5, textTransform: 'none' }}
                  onClick={() => handleOpenDialog('accept')}
                >
                  <Done sx={{ color: '#FFF' }} />
                  <Typography color="white">Accepter</Typography>
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ borderRadius: 5, textTransform: 'none' }}
                  onClick={() => handleOpenDialog('decline')}
                >
                  <CloseOutlined sx={{ color: '#FFF' }} />
                  <Typography color="white">Refuser</Typography>
                </Button>
              </Stack>
            </Box>
            <ChatDrawer isActive={data.klad.isDraft} klad={data.klad} />
          </>
        )}

        <Dialog open={isOpen} onClose={() => handleCloseDialog()}>
          <DialogTitle>
            {dialogData === 'accept'
              ? "Accepter l'etude de projet"
              : "Refuser l'etude de projet"}
          </DialogTitle>
          <DialogContent>
            <Box px={2}>
              {dialogData === 'accept' ? (
                <Typography component="p">
                  Voulez-vous vraiment accepter ce Klad ?
                  <br />
                  Ce klad sera public et les kladeurs seront capable de le voir
                  et d&apos;investir
                </Typography>
              ) : (
                <Typography component="p">
                  Voulez-vous vraiment refuser cette etude ?
                  <br />
                  ce klad sera archiver et désactiver. assurez-vous d&apos;avoir
                  clairement indiqué le motif du refus dans le chat.
                </Typography>
              )}
            </Box>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Stack direction="row" spacing={2} justifyContent="space-between">
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
                  if (dialogData === 'accept') {
                    const txtFile: Blob = createTxtFile(data.klad.messages);
                    basicUpload({
                      accountId: 'W142iCz',
                      apiKey: 'public_W142iCzFqiJEacLzJCW4KQsGvEFm',
                      requestBody: txtFile,
                    }).then(
                      (response) => {
                        console.log(response.fileUrl);
                        deleteKladMessages({ variables: { kladId } });
                        updateKlad({
                          variables: {
                            updateKladId: kladId,
                            updateKladInput: {
                              isApproved: true,
                              isDraft: false,
                              inReview: false,
                              archivedMessagesUrl: response.fileUrl,
                            },
                          },
                        });
                      },
                      (error) => console.error(error)
                    );
                  } else {
                    const txtFile: Blob = createTxtFile(data.klad.messages);
                    basicUpload({
                      accountId: 'W142iCz',
                      apiKey: 'public_W142iCzFqiJEacLzJCW4KQsGvEFm',
                      requestBody: txtFile,
                    }).then(
                      (response) => {
                        deleteKladMessages({ variables: { kladId } });
                        updateKlad({
                          variables: {
                            updateKladId: kladId,
                            updateKladInput: {
                              isRejected: true,
                              isDraft: false,
                              inReview: false,
                              archivedMessagesUrl: response.fileUrl,
                            },
                          },
                        });
                      },
                      (error) => console.error(error)
                    );
                  }
                }}
              >
                {dialogData === 'accept' ? 'Accepter' : 'Refuser'}
              </Button>
            </Stack>
          </DialogActions>
        </Dialog>
      </Box>
    );
  return <Unauthorized />;
}
export default KladReview;
