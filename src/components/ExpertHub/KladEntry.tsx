import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  Stack,
  Typography,
  capitalize,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Klad } from '../../utils/Interfaces/Klad.interface';

interface KladEntryProps {
  klad: Klad;
}

function KladEntry({ klad }: KladEntryProps) {
  const navigate = useNavigate();
  return (
    <Box sx={{ mb: 2 }}>
      <Card sx={{ py: 3, px: 1, borderRadius: 3 }}>
        <Stack spacing={2} direction="row" sx={{ display: 'flex' }}>
          <Avatar
            src={klad.owner.profilePictureUrl}
            sx={{
              width: 50,
              height: 50,
              border: '1px solid lightgrey',
            }}
          />
          <Stack spacing={1} sx={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                component="h3"
                variant="h6"
                fontSize={16}
                lineHeight={3}
              >
                {capitalize(`${klad.owner.firstname} ${klad.owner.lastname}`)}
              </Typography>
              {klad.isDraft && (
                <Button
                  sx={{
                    textTransform: 'none',
                    py: 0,
                    height: '70%',
                    my: 'auto',
                    borderRadius: 5,
                  }}
                  variant="contained"
                  size="small"
                  onClick={() => navigate(`/expert-hub/review/${klad.id}`)}
                >
                  Examiner
                </Button>
              )}
              {klad.isApproved && (
                <Button
                  sx={{
                    textTransform: 'none',
                    py: 0,
                    height: '70%',
                    my: 'auto',
                    borderRadius: 5,
                  }}
                  variant="contained"
                  size="small"
                  onClick={() => navigate(`/klad/${klad.id}`)}
                >
                  Visiter
                </Button>
              )}
            </Stack>
            <Box
              sx={{
                width: '100%',
                backgroundColor: '#F1F1F1',
                borderRadius: 3,
                p: 2,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} lg={3}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: '100%',
                      height: '100%',
                      maxHeight: '125px',
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

                <Grid item xs={12} sm={6} lg={6}>
                  <Box>
                    <Typography component="h3" variant="h6" fontSize={16}>
                      {capitalize(`${klad.name}`)}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="p"
                      style={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {klad.description}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} lg={3}>
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'white',
                      borderRadius: 3,
                      display: 'flex',
                      p: 1,
                    }}
                  >
                    <Stack spacing={2} sx={{ my: 'auto', width: '100%' }}>
                      <Typography
                        variant="h4"
                        fontWeight={500}
                        fontSize={14}
                        textAlign="center"
                      >
                        Somme demandée
                      </Typography>
                      <Box px={3}>
                        <Typography
                          variant="h4"
                          color="primary"
                          fontSize={14}
                          textAlign="center"
                          sx={{
                            p: 1,
                            backgroundColor: '#E7F0F1',
                            borderRadius: 2,
                          }}
                        >
                          {klad.budgetNeeded} $
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
}
export default KladEntry;
