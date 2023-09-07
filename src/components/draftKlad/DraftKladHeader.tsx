/* eslint-disable import/no-extraneous-dependencies */
import { EditOutlined } from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Klad } from '../../utils/Interfaces/Klad.interface';
import { UPDATE_KLAD } from '../../utils/GraphQL/Mutations';

interface DraftKladHeaderProps {
  klad: Klad;
  refetch: any;
}

const uploader = Uploader({ apiKey: 'public_W142iCzFqiJEacLzJCW4KQsGvEFm' }); // Your real API key.

function DraftKladHeader({ klad, refetch }: DraftKladHeaderProps) {
  const [updateKlad] = useMutation(UPDATE_KLAD);

  return (
    <Box mb={5}>
      <Box
        // 3:1 aspect ratio
        sx={{
          mt: '-70px',
          height: '315px',
          width: '100%',
          backgroundImage: klad.coverPictureUrl
            ? `url("${klad.coverPictureUrl}")`
            : `url("https://via.placeholder.com/900x300")`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <UploadButton
          uploader={uploader}
          options={{
            editor: {
              images: {
                crop: true,
                cropRatio: 2.7,
                preview: true,
              },
            },
            showRemoveButton: true,
            multi: false,
            mimeTypes: ['image/jpeg', 'image/png'],
          }}
          onComplete={(files) => {
            updateKlad({
              variables: {
                updateKladId: klad.id,
                updateKladInput: {
                  coverPictureUrl: files[0].fileUrl,
                },
              },
              onCompleted() {
                refetch();
              },
            });
            // setImageURL(files[0].fileUrl);
          }}
        >
          {({ onClick }) => (
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={onClick}
              sx={{
                borderRadius: 5,
                backgroundColor: '#F1F1F1',
                color: 'grey',
                borderColor: 'grey',
                position: 'absolute',
                bottom: 10,
                right: 10,
                textTransform: 'none',
                ':hover': {
                  backgroundColor: '#F1F1F1',
                },
              }}
            >
              Modifier <EditOutlined />
            </Button>
          )}
        </UploadButton>
      </Box>
      <Box sx={{ px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={4} md={3} lg={2.5} xl={2}>
            <Box
              sx={{
                display: { xs: 'flex', sm: 'block' },
                justifyContent: 'center',
              }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <UploadButton
                    uploader={uploader}
                    options={{
                      editor: {
                        images: {
                          crop: true,
                          cropRatio: 1,
                          cropShape: 'circ',
                          preview: true,
                        },
                      },
                      showRemoveButton: true,
                      multi: false,
                      mimeTypes: ['image/jpeg', 'image/png'],
                    }}
                    onComplete={(files) => {
                      updateKlad({
                        variables: {
                          updateKladId: klad.id,
                          updateKladInput: {
                            pictureUrl: files[0].fileUrl,
                          },
                        },
                        onCompleted() {
                          refetch();
                        },
                      });
                      // setImageURL(files[0].fileUrl);
                    }}
                  >
                    {({ onClick }) => (
                      <IconButton
                        sx={{
                          backgroundColor: '#F1F1F1',
                          border: '1px solid',
                          ':hover': {
                            backgroundColor: '#F1F1F1',
                          },
                        }}
                        size="small"
                        onClick={onClick}
                      >
                        <EditOutlined sx={{ fontSize: 18 }} />
                      </IconButton>
                    )}
                  </UploadButton>
                }
              >
                <Avatar
                  src={klad.pictureUrl}
                  alt="klad-img"
                  sx={{
                    width: '150px',
                    height: '150px',
                    my: -3,
                  }}
                />
              </Badge>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={9.5} xl={10}>
            <Box
              sx={{
                display: { xs: 'flex', sm: 'block' },
                justifyContent: 'center',
                mt: 3,
              }}
            >
              <Stack spacing={1}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent={{ xs: 'center', sm: 'left' }}
                >
                  <Typography variant="h5" component="h2">
                    {klad.name}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent={{ xs: 'center', sm: 'left' }}
                >
                  <Chip
                    label={klad.subCategory.category.name}
                    variant="outlined"
                    size="small"
                    color="success"
                  />
                  <Chip
                    label={klad.subCategory.name}
                    variant="outlined"
                    size="small"
                    color="warning"
                  />
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default DraftKladHeader;
