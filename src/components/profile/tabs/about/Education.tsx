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

function Education({ editEdu }: any) {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        px: 3,
        pt: 2,
        pb: 4,
        borderRadius: 3,
        boxShadow: 1,
        mb: 3,
      }}
    >
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography
          component="h2"
          fontSize={16}
          fontWeight={500}
          lineHeight={2.25}
        >
          Formations
        </Typography>
        <Button
          color="secondary"
          size="large"
          sx={{ borderRadius: 25, fontSize: 10, backgroundColor: '#F0F0F0' }}
          onClick={() => editEdu(2)}
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
                  src="https://media.istockphoto.com/id/525027270/vector/graduation-cap-vector-illustration-academy-hat-icon.jpg?s=612x612&w=0&k=20&c=e34EEeoDsU5pBPji-J2aIdua0gB75378Efbl53P8TuY="
                  alt="institute"
                  sx={{ my: 'auto' }}
                />
                <Stack display="inline-block">
                  <Typography>
                    Institut Supérieur des Beaux Arts de Sousse
                  </Typography>
                  <Typography variant="caption" style={{ color: 'grey' }}>
                    Licence appliquée en Design Graphique
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    style={{ color: 'grey' }}
                  >
                    2007 - 2010
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
          </Box>
        </Grid>
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
                  src="https://media.istockphoto.com/id/525027270/vector/graduation-cap-vector-illustration-academy-hat-icon.jpg?s=612x612&w=0&k=20&c=e34EEeoDsU5pBPji-J2aIdua0gB75378Efbl53P8TuY="
                  alt="institute"
                  sx={{ my: 'auto' }}
                />
                <Stack display="inline-block">
                  <Typography>
                    Institut Supérieur des Beaux Arts de Sousse
                  </Typography>
                  <Typography variant="caption" style={{ color: 'grey' }}>
                    Licence appliquée en Design Graphique
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    style={{ color: 'grey' }}
                  >
                    2007 - 2010
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Education;
