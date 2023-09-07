/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';
import { AddOutlined } from '@mui/icons-material';

import { useMutation } from '@apollo/client';
import { Klad } from '../../utils/Interfaces/Klad.interface';
import { UPDATE_KLAD } from '../../utils/GraphQL/Mutations';

interface PicturesProps {
  klad: Klad;
}

const uploader = Uploader({ apiKey: 'public_W142iCzFqiJEacLzJCW4KQsGvEFm' }); // Your real API key.

function Pictures({ klad }: PicturesProps) {
  const [updateKlad] = useMutation(UPDATE_KLAD);
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography component="h2" variant="h5" fontWeight={500} gutterBottom>
          Photos
        </Typography>
        <UploadButton
          uploader={uploader}
          options={{
            editor: {
              images: {
                crop: true,
                preview: true,
              },
            },
            showRemoveButton: true,
            multi: true,
            mimeTypes: ['image/jpeg', 'image/png'],
          }}
          onComplete={(files) => {
            const urls = files.map((file) => file.fileUrl);
            updateKlad({
              variables: {
                updateKladId: klad.id,
                updateKladInput: {
                  pictures: [...klad.pictures, ...urls],
                },
              },
            });

            // setImageURL(files[0].fileUrl);
          }}
        >
          {({ onClick }) => (
            <Button
              variant="outlined"
              size="small"
              sx={{ borderRadius: 5, textTransform: 'none' }}
              onClick={onClick}
            >
              <AddOutlined /> Ajouter des Photos
            </Button>
          )}
        </UploadButton>
      </Stack>
      <Box sx={{ my: 3 }}>
        <Grid container spacing={2}>
          {klad.pictures.map((pic, index) => (
            <Grid key={index} item xs={12} sm={6} md={6} lg={4} xl={3}>
              <Card>
                <CardMedia
                  component="img"
                  width="100%"
                  height="190px"
                  image={pic}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Pictures;
