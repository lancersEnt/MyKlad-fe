/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@apollo/client';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { BookmarkAddOutlined, ShareOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Klad } from '../utils/Interfaces/Klad.interface';
import { BorderLinearProgress } from '../components/settings/SecurityTab';
import { RootState } from '../app/store';
import Unauthorized from './Errors/Unauthorized';
import { MY_KLADS } from '../utils/GraphQL/Queries';

function MyKlads() {
  const user = useSelector((state: RootState) => state.auth.user);
  if (user.permissions.includes('page')) {
    const { data: myKlads, loading, error } = useQuery(MY_KLADS);
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" fontSize={16} fontWeight={500} gutterBottom>
          Mes Klads
        </Typography>
        <Grid container spacing={2}>
          {!loading &&
            myKlads &&
            myKlads.myKlads.map((klad: Klad) => (
              <Grid item key={klad.id} xs={4}>
                <Card sx={{ display: 'flex', mb: 3, borderRadius: 3 }}>
                  <Grid container>
                    <Grid item xs={12}>
                      <CardMedia
                        component="img"
                        image={klad.pictureUrl}
                        alt={klad.name}
                        sx={{
                          height: '100%',
                          width: '100%',
                          maxHeight: '150px',
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                          <Link
                            style={{ textDecoration: 'none' }}
                            to={`/klad/${klad.id}`}
                          >
                            <Typography
                              color="text.primary"
                              component="p"
                              variant="h6"
                              fontSize={14}
                              style={{
                                maxHeight: '1.5em', // Set the maximum height to 4 lines of text
                                overflow: 'hidden', // Hide any overflow beyond the specified height
                                display: '-webkit-box', // For compatibility with some browsers
                                WebkitLineClamp: 4, // Limit the number of displayed lines to 4
                                WebkitBoxOrient: 'vertical',
                              }}
                            >
                              {klad.name}
                            </Typography>
                          </Link>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            component="div"
                          >
                            {`prix de part : ${klad.partPrice}$`}
                          </Typography>
                        </CardContent>
                        <Box sx={{ alignItems: 'center', px: 2, pb: 2 }}>
                          <Stack direction="row" justifyContent="space-between">
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              component="div"
                            >
                              {`collecté : ${klad.budgetCollected}$`}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              component="div"
                            >
                              {`besoin : ${klad.budgetNeeded}$`}
                            </Typography>
                          </Stack>
                          <BorderLinearProgress
                            value={
                              (klad.budgetCollected / klad.budgetNeeded) * 100
                            }
                            variant="determinate"
                            sx={{
                              mb: 1,
                            }}
                          />
                          <Stack spacing={2} direction="row-reverse">
                            {/* <IconButton>
                              <BookmarkAddOutlined />
                            </IconButton> */}
                            <IconButton>
                              <ShareOutlined />
                            </IconButton>
                          </Stack>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    );
  }
  return <Unauthorized />;
}
export default MyKlads;
