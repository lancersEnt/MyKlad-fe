import {
  ChevronLeftOutlined,
  ChevronRightOutlined,
  PlayArrow,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import Post from '../../../utils/Interfaces/Post.Interface';

const CardMediaWrapper = styled('div')({
  position: 'relative',
});

const Overlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
});

const PlayButton = styled(IconButton)({
  color: '#fff',
  fontSize: 60,
});

interface VideosProps {
  videos: Post[];
}

function Videos({ videos }: VideosProps) {
  return (
    <Box>
      <Typography fontSize={16} fontWeight={500} gutterBottom>
        Videos
      </Typography>
      <Grid container spacing={2}>
        {videos.map((post) => (
          <Grid key={post.id} item xs={12} sm={6} md={6} lg={4} xl={3}>
            <Card>
              <CardMediaWrapper>
                <CardMedia
                  width="100%"
                  height="190px"
                  component="video"
                  // src={post.videoUrl}
                  image={post.videoUrl}
                />
                <Overlay>
                  <PlayButton aria-label="play">
                    <PlayArrow />
                  </PlayButton>
                </Overlay>
              </CardMediaWrapper>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Stack
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
      </Stack>
    </Box>
  );
}
export default Videos;
