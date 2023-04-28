import { ReactElement } from 'react';

import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Stack,
} from '@mui/material';

import GenderIcon from '@mui/icons-material/WcRounded';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import DOBIcon from '@mui/icons-material/CakeOutlined';
import AddressIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneIcon from '@mui/icons-material/PhoneEnabledOutlined';
import PublicIcon from '@mui/icons-material/PublicRounded';
import OnlyMeIcon from '@mui/icons-material/LockOutlined';
import FriendsIcon from '@mui/icons-material/PeopleAltOutlined';

import CustomTextField from '../../../../common/inputs/CustomTextField';
import CustomSelectField from '../../../../common/inputs/CustomSelectField';

function GeneralInfoForm(): ReactElement {
  return (
    <Stack spacing={2}>
      {/* Gendre Input */}
      <Stack direction="row" spacing={2}>
        <GenderIcon color="secondary" sx={{ my: 'auto' }} />
        <FormControl
          sx={{
            m: 1,
            borderRadius: 3,
            border: 'none',
          }}
          variant="filled"
          fullWidth
        >
          <InputLabel id="sex">Genre</InputLabel>
          <CustomSelectField
            sx={{
              borderRadius: 3,
            }}
            fullWidth
            disableUnderline
            labelId="sex"
            id="sex-select"
            label="Genre"
            variant="filled"
            defaultValue="male"
          >
            <MenuItem value="male">Mâle</MenuItem>
            <MenuItem value="female">Femelle</MenuItem>
          </CustomSelectField>
        </FormControl>
        <Box display="flex">
          <IconButton sx={{ backgroundColor: '#e6e8ea', my: 'auto' }}>
            <OnlyMeIcon
              sx={{
                color: 'grey',
                my: 'auto',
                fontSize: '18px',
              }}
            />
          </IconButton>
        </Box>
      </Stack>
      {/* Email Input */}
      <Stack direction="row" spacing={2}>
        <EmailIcon color="secondary" sx={{ my: 'auto' }} />
        <CustomTextField
          InputProps={{
            disableUnderline: true,
          }}
          variant="filled"
          label="Email"
          defaultValue="saafghassen@gmail.com"
          fullWidth
        />
        <Box display="flex">
          <IconButton sx={{ backgroundColor: '#e6e8ea', my: 'auto' }}>
            <OnlyMeIcon
              sx={{
                color: 'grey',
                my: 'auto',
                fontSize: '18px',
              }}
            />
          </IconButton>
        </Box>
      </Stack>
    </Stack>
  );
}

export default GeneralInfoForm;
