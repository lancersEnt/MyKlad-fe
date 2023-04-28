import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import EditIcon from '@mui/icons-material/EditOutlined';
import PublicIcon from '@mui/icons-material/PublicRounded';

function Experience({ editExp }: any) {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        px: 3,
        pt: 2,
        pb: 4,
        borderRadius: 3,
        boxShadow: 1,
      }}
    >
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography
          component="h2"
          fontSize={16}
          fontWeight={500}
          lineHeight={2.25}
        >
          Experience
        </Typography>
        <Button
          color="secondary"
          size="large"
          sx={{ borderRadius: 25, fontSize: 10, backgroundColor: '#F0F0F0' }}
          onClick={() => editExp(3)}
        >
          <EditIcon sx={{ fontSize: 18, mr: 0.5 }} />
          Modifier
        </Button>
      </Stack>
      <Grid container spacing={2} px={1}>
        <Grid item xs={12}>
          <Box
            sx={{
              p: 1,
              borderRadius: 3,
              border: '1px solid #DEDEDE',
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={2}>
                <Avatar
                  src="https://scontent.ftun10-1.fna.fbcdn.net/v/t39.30808-1/327213884_443499851238675_8735208644680745203_n.png?stp=dst-png_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=c6021c&_nc_ohc=aaC2URLaGAkAX8184Ku&_nc_ht=scontent.ftun10-1.fna&oh=00_AfDil1_OJSVzGYTkye5bLnijyY_AE7F9pZT9NYOyYBSs8w&oe=644F2C35"
                  alt="institute"
                  sx={{ mb: 'auto', width: '100px', height: '100px' }}
                />
                <Stack display="inline-block" spacing={3}>
                  <Typography sx={{ height: '100%', pt: '1.25rem' }}>
                    WEVIOO
                    <Typography
                      variant="caption"
                      display="block"
                      style={{ color: 'grey' }}
                    >
                      3 ans 6 mois
                    </Typography>
                  </Typography>
                </Stack>
              </Stack>
              <IconButton disabled>
                <PublicIcon
                  sx={{
                    color: 'grey',
                    mb: 'auto',
                    fontSize: 18,
                  }}
                />
              </IconButton>
            </Stack>
            <Box>
              <Stack spacing={1}>
                <Typography>
                  Developpeur Js FullStack
                  <Typography
                    variant="caption"
                    display="block"
                    style={{ color: 'grey' }}
                  >
                    Juin 2010 - Avril 2020
                  </Typography>
                </Typography>

                <Typography paragraph fontSize={14}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officiis incidunt sunt architecto, nemo quaerat sit
                  doloremque! Nulla culpa ullam eaque ex eveniet quidem, natus
                  magnam. Dicta beatae facilis nihil officia!
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Experience;
