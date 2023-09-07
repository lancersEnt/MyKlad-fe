/* eslint-disable import/no-extraneous-dependencies */
import { Box, Button, Stack, Typography } from '@mui/material';
import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';
import { AddOutlined } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { Klad } from '../../utils/Interfaces/Klad.interface';
import { UPDATE_KLAD } from '../../utils/GraphQL/Mutations';

interface VideosProps {
  klad: Klad;
}

const uploader = Uploader({ apiKey: 'public_W142iCzFqiJEacLzJCW4KQsGvEFm' }); // Your real API key.

function Videos({ klad }: VideosProps) {
  const [updateKlad] = useMutation(UPDATE_KLAD);
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography component="h2" variant="h5" fontWeight={500} gutterBottom>
          Videos
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
            mimeTypes: ['video/mp4', 'video/mpeg'],
          }}
          onComplete={(files) => {
            const urls = files.map((file) => file.fileUrl);
            updateKlad({
              variables: {
                updateKladId: klad.id,
                updateKladInput: {
                  videos: [...klad.videos, ...urls],
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
              <AddOutlined /> Ajouter des videos
            </Button>
          )}
        </UploadButton>
      </Stack>
    </Box>
  );
}

export default Videos;
