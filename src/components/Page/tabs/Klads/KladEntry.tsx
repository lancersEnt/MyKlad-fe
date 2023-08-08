import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';

import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { CopyAllOutlined, ShareOutlined } from '@mui/icons-material';
import { BorderLinearProgress } from '../../../settings/SecurityTab';

function KladEntry() {
  return (
    <Box sx={{ mb: 2 }}>
      <Card sx={{ display: 'flex', borderRadius: 2 }}>
        <Grid container>
          <Grid item xs={12} sm={4} md={12} lg={4}>
            <CardMedia
              component="img"
              sx={{
                width: '100%',
                height: '100%',
                maxHeight: '350px',
                borderRadius: 2,
              }}
              image="https://upcdn.io/kW15bZn/raw/uploads/2023/08/04/scott-goodwill-y8Ngwq34_Ak-unsplash-4biQ.jpg"
              alt="KladName"
            />
          </Grid>
          <Grid item xs={12} sm={8} md={12} lg={8}>
            <CardContent>
              <Stack spacing={1}>
                <Typography
                  component="h5"
                  variant="h5"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  Klad Name - wxzzz azjfo fezzkeofjazeofjoajzoeaz
                </Typography>
                <Typography
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                  }}
                  variant="subtitle1"
                  color="secondary"
                  component="p"
                  fontSize={12}
                >
                  Crée le 00 Juin 2000
                </Typography>
                <Typography
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                  }}
                  color="primary"
                >
                  7500$ récullis sur 15000$
                </Typography>
                <BorderLinearProgress
                  sx={{ width: '100%' }}
                  color="primary"
                  value={15}
                  variant="determinate"
                />
                <Typography
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                  }}
                  variant="subtitle1"
                  color="secondary"
                  component="p"
                  fontSize={12}
                >
                  100$/Part - 5 Parts Min. - 100 Parts Max.
                </Typography>
                <Stack
                  direction="row"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Box>
                    <Button variant="contained" sx={{ borderRadius: 5 }}>
                      Investir
                    </Button>
                  </Box>
                  <Box>
                    <Stack direction="row" spacing={2}>
                      <IconButton>
                        <CopyAllOutlined />
                      </IconButton>
                      <IconButton>
                        <ShareOutlined />
                      </IconButton>
                    </Stack>
                  </Box>
                </Stack>
              </Stack>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
export default KladEntry;
