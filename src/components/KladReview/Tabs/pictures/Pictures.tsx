/* eslint-disable react/no-array-index-key */
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material';
import {
  Box,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

interface PicturesProps {
  pictures: string[] | undefined;
}
function Pictures({ pictures }: PicturesProps) {
  return (
    <Box>
      <Typography fontSize={16} fontWeight={500} gutterBottom>
        Photos
      </Typography>
      <Grid container spacing={2}>
        {pictures?.map((pic, index) => (
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
      {/* <Stack
        direction="row"
        mt={3}
        spacing={2}
        display="flex"
        justifyContent="center"
      >
        <IconButton sx={{ border: '1px solid grey' }}>
          <ChevronLeftOutlined />
        </IconButton>
        <IconButton sx={{ border: '1px solid grey' }}>
          <ChevronRightOutlined />
        </IconButton>
      </Stack> */}
    </Box>
  );
}
export default Pictures;
