import { InfoOutlined, PeopleAltOutlined } from '@mui/icons-material';
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import User from '../../utils/Interfaces/User.interface';

interface SidePanelProps {
  page: User | null;
}

function PageSidePanel({ page }: SidePanelProps) {
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          impedit a excepturi porro explicabo delectus totam deleniti labore
          quia architecto sit sed in earum saepe sint dolore, veritatis ullam
          recusandae.
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
            Gestionnaires
          </Typography>
        </Stack>
        {page &&
          page.managers.map((user) => (
            <Stack
              key={user.username}
              direction="row"
              spacing={2}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <IconButton sx={{ my: 'auto', p: 0 }}>
                <Avatar
                  alt="Avatar"
                  sx={{ width: 30, height: 30 }}
                  src={user.profilePictureUrl}
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
                  to={
                    user.permissions.includes('user')
                      ? `/klader/${user.username}`
                      : `/page/${user.username}`
                  }
                >{`${user.firstname} ${user.lastname}`}</Link>
              </Typography>
            </Stack>
          ))}
      </Box>
    </Box>
  );
}
export default PageSidePanel;
