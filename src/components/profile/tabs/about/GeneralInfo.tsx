import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import EditIcon from '@mui/icons-material/EditOutlined';
import GenderIcon from '@mui/icons-material/WcRounded';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import DOBIcon from '@mui/icons-material/CakeOutlined';
import AddressIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneIcon from '@mui/icons-material/PhoneEnabledOutlined';
import PublicIcon from '@mui/icons-material/PublicRounded';
import OnlyMeIcon from '@mui/icons-material/LockOutlined';
import FriendsIcon from '@mui/icons-material/PeopleAltOutlined';
import moment from 'moment';
import 'moment/locale/fr';
import User from '../../../../utils/Interfaces/User.interface';

moment.locale('fr');

interface GeneralInfoProps {
  editInfo: any;
  user: User;
}

function GeneralInfo({ editInfo, user }: GeneralInfoProps) {
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
          Informations générale
        </Typography>
      </Stack>
      <Grid container spacing={2} px={1}>
        {/* Gendre */}
        <Grid item xs={12} sm={12} md={6}>
          <Box
            sx={{
              p: 1,
              borderRadius: 3,
              border: '1px solid #DEDEDE',
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={2}>
                <GenderIcon sx={{ height: '100%', color: 'grey' }} />
                <Stack display="inline-block">
                  <Typography variant="caption" style={{ color: 'grey' }}>
                    Genre
                  </Typography>
                  <Typography
                    noWrap
                    maxWidth={{ xs: 170, sm: 350, md: 180, xl: 280 }}
                  >
                    {user.sex === 'male' ? 'Masculin' : 'Feminin'}
                  </Typography>
                </Stack>
              </Stack>
              <IconButton disabled>
                <PublicIcon
                  sx={{
                    color: 'grey',
                    my: 'auto',
                    fontSize: 18,
                  }}
                />
              </IconButton>
            </Stack>
          </Box>
        </Grid>
        {/* Email */}
        <Grid item xs={12} sm={12} md={6}>
          <Box
            sx={{
              p: 1,
              borderRadius: 3,
              border: '1px solid #DEDEDE',
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={2}>
                <EmailIcon sx={{ height: '100%', color: 'grey' }} />
                <Stack display="inline-block">
                  <Typography variant="caption" style={{ color: 'grey' }}>
                    Email
                  </Typography>
                  <Typography
                    noWrap
                    maxWidth={{ xs: 170, sm: 350, md: 180, xl: 280 }}
                  >
                    {user.email}
                  </Typography>
                </Stack>
              </Stack>
              <IconButton disabled>
                <PublicIcon
                  sx={{
                    color: 'grey',
                    my: 'auto',
                    fontSize: 18,
                  }}
                />
              </IconButton>
            </Stack>
          </Box>
        </Grid>
        {/* DOB */}
        <Grid item xs={12} sm={12} md={6}>
          <Box
            sx={{
              p: 1,
              borderRadius: 3,
              border: '1px solid #DEDEDE',
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={2}>
                <DOBIcon sx={{ height: '100%', color: 'grey' }} />
                <Stack display="inline-block">
                  <Typography variant="caption" style={{ color: 'grey' }}>
                    Date de naissance
                  </Typography>
                  <Typography
                    noWrap
                    maxWidth={{ xs: 170, sm: 350, md: 180, xl: 280 }}
                  >
                    {new Date(user.dateOfBirth).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Typography>
                </Stack>
              </Stack>
              <IconButton disabled>
                <PublicIcon
                  sx={{
                    color: 'grey',
                    my: 'auto',
                    fontSize: 18,
                  }}
                />
              </IconButton>
            </Stack>
          </Box>
        </Grid>
        {/* Address */}
        <Grid item xs={12} sm={12} md={6}>
          <Box
            sx={{
              p: 1,
              borderRadius: 3,
              border: '1px solid #DEDEDE',
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={2}>
                <AddressIcon sx={{ height: '100%', color: 'grey' }} />
                <Stack display="inline-block" textOverflow="hidden">
                  <Typography variant="caption" style={{ color: 'grey' }}>
                    Adresse
                  </Typography>
                  <Typography
                    noWrap
                    maxWidth={{ xs: 170, sm: 350, md: 180, xl: 280 }}
                  >
                    {user.address}
                  </Typography>
                </Stack>
              </Stack>
              <IconButton disabled>
                <PublicIcon
                  sx={{
                    color: 'grey',
                    my: 'auto',
                    fontSize: 18,
                  }}
                />
              </IconButton>
            </Stack>
          </Box>
        </Grid>
        {/* Phone */}
        <Grid item xs={12} sm={12} md={6}>
          <Box
            sx={{
              p: 1,
              borderRadius: 3,
              border: '1px solid #DEDEDE',
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={2}>
                <PhoneIcon sx={{ height: '100%', color: 'grey' }} />
                <Stack display="inline-block">
                  <Typography variant="caption" style={{ color: 'grey' }}>
                    Phone
                  </Typography>
                  <Typography
                    noWrap
                    maxWidth={{ xs: 170, sm: 350, md: 180, xl: 280 }}
                  >
                    {user.phone}
                  </Typography>
                </Stack>
              </Stack>
              <IconButton disabled>
                <PublicIcon
                  sx={{
                    color: 'grey',
                    my: 'auto',
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
export default GeneralInfo;
