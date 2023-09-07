import { InfoOutlined, PeopleAltOutlined } from '@mui/icons-material';
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import User from '../../../../utils/Interfaces/User.interface';
import { Klad } from '../../../../utils/Interfaces/Klad.interface';

interface SidePanelProps {
  klad: Klad | null;
}

function AboutSidePanel({ klad }: SidePanelProps) {
  return (
    <Box>
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
        <Stack direction="row" spacing={1} mb={2}>
          <InfoOutlined color="secondary" />
          <Typography
            component="h2"
            fontSize={16}
            fontWeight={500}
            lineHeight={-5}
          >
            A Propos
          </Typography>
        </Stack>
        <Typography component="p" fontSize={12} fontWeight={400}>
          {klad?.description}
        </Typography>
      </Box>
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
        <Stack direction="row" spacing={1} mb={2}>
          <PeopleAltOutlined color="secondary" />
          <Typography
            component="h2"
            fontSize={16}
            fontWeight={500}
            lineHeight={-5}
          >
            propriétaire
          </Typography>
        </Stack>
        {klad && (
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <IconButton sx={{ my: 'auto', p: 0 }}>
              <Avatar
                alt="Avatar"
                sx={{ width: 30, height: 30 }}
                src={klad.owner.profilePictureUrl}
              />
            </IconButton>
            <Typography
              fontWeight={500}
              fontSize={14}
              textTransform="capitalize"
            >
              <Link
                preventScrollReset={false}
                style={{ textDecoration: 'none', color: 'black' }}
                to={`/page/${klad.owner.username}`}
              >{`${klad.owner.firstname} ${klad.owner.lastname}`}</Link>
            </Typography>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
export default AboutSidePanel;
