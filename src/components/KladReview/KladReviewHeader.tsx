/* eslint-disable import/no-extraneous-dependencies */
import { EditOutlined } from '@mui/icons-material';
import { Avatar, Box, Chip, Grid, Stack, Typography } from '@mui/material';
import { Klad } from '../../utils/Interfaces/Klad.interface';

interface DraftKladHeaderProps {
  klad: Klad;
}

function KladReviewHeader({ klad }: DraftKladHeaderProps) {
  return (
    <Box mb={5}>
      <Box
        // 3:1 aspect ratio
        sx={{
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
      />
      <Box sx={{ px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={4} md={3} lg={2.5} xl={2}>
            <Box
              sx={{
                display: { xs: 'flex', sm: 'block' },
                justifyContent: 'center',
              }}
            >
              <Avatar
                src={klad.pictureUrl}
                alt="klad-img"
                sx={{
                  width: '150px',
                  height: '150px',
                  m: -3,
                }}
              />
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
export default KladReviewHeader;
