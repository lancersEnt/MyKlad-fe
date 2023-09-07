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
import { Klad } from '../../../../utils/Interfaces/Klad.interface';
import { dateToNormalFormat } from '../../../../utils/dateUtils';

interface KladEntryProps {
  klad: Klad;
}

function KladEntry({ klad }: KladEntryProps) {
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
              image={
                klad.pictureUrl
                  ? klad.pictureUrl
                  : 'https://upcdn.io/W142iAJ/raw/uploads/2023/08/17/4mEJrnT321-lorenzo-gerosa-JbyzWiyo6ao-unsplash.jpg'
              }
              alt={klad.name}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={12} lg={8}>
            <CardContent sx={{ height: '100%' }}>
              <Stack sx={{ height: '100%', justifyContent: 'space-between' }}>
                <Box>
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
                    {klad.name}
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
                    {dateToNormalFormat(klad.createdAt)}
                  </Typography>
                </Box>
                <Box>
                  <Stack spacing={1}>
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
                      {klad.budgetCollected}$ récullis sur {klad.budgetNeeded}$
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
                </Box>
              </Stack>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
export default KladEntry;
