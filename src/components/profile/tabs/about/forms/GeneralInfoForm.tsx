import React, { ReactElement } from 'react';

import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
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
  const [genderVis, setGenderVis] = React.useState<string>('public'); // values accepted : onlyMe, friends, public
  const [emailVis, setEmailVis] = React.useState<string>('friends'); // values accepted : onlyMe, friends, public
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (field: string, vis?: string) => {
    if (typeof vis !== 'undefined') {
      if (field === 'gender') setGenderVis(vis);
      else if (field === 'email') setEmailVis(vis);
    }
    setAnchorEl(null);
  };
  return (
    <Stack spacing={3} height="100%" justifyContent="center">
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
          <IconButton
            className="gender-vis-button"
            aria-controls={
              anchorEl?.classList.contains('gender-vis-button')
                ? 'gender-vis-menu'
                : undefined
            }
            aria-haspopup="true"
            aria-expanded={
              anchorEl?.classList.contains('gender-vis-button')
                ? 'true'
                : undefined
            }
            onClick={handleClick}
            sx={{ backgroundColor: '#e6e8ea', my: 'auto' }}
          >
            {genderVis === 'onlyMe' && (
              <OnlyMeIcon
                sx={{
                  color: 'grey',
                  my: 'auto',
                  fontSize: '18px',
                }}
              />
            )}
            {genderVis === 'friends' && (
              <FriendsIcon
                sx={{
                  color: 'grey',
                  my: 'auto',
                  fontSize: '18px',
                }}
              />
            )}
            {genderVis === 'public' && (
              <PublicIcon
                sx={{
                  color: 'grey',
                  my: 'auto',
                  fontSize: '18px',
                }}
              />
            )}
          </IconButton>
          <Menu
            id="gender-vis-menu"
            anchorEl={anchorEl}
            open={!!anchorEl?.classList.contains('gender-vis-button')}
            onClose={() => handleClose('gender')}
            MenuListProps={{
              'aria-labelledby': 'basic-button-gender',
            }}
          >
            <MenuItem onClick={() => handleClose('gender', 'onlyMe')}>
              <OnlyMeIcon
                sx={{
                  color: 'grey',
                  my: 'auto',
                  fontSize: '18px',
                  mr: 2,
                }}
              />
              Only Me
            </MenuItem>
            <MenuItem onClick={() => handleClose('gender', 'friends')}>
              <FriendsIcon
                sx={{
                  color: 'grey',
                  my: 'auto',
                  fontSize: '18px',
                  mr: 2,
                }}
              />
              Friend
            </MenuItem>
            <MenuItem onClick={() => handleClose('gender', 'public')}>
              <PublicIcon
                sx={{
                  color: 'grey',
                  my: 'auto',
                  fontSize: '18px',
                  mr: 2,
                }}
              />
              Public
            </MenuItem>
          </Menu>
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
          <IconButton
            className="email-vis-button"
            aria-controls={
              anchorEl?.classList.contains('email-vis-button')
                ? 'email-vis-menu'
                : undefined
            }
            aria-haspopup="true"
            aria-expanded={
              anchorEl?.classList.contains('email-vis-button')
                ? 'true'
                : undefined
            }
            onClick={handleClick}
            sx={{ backgroundColor: '#e6e8ea', my: 'auto' }}
          >
            {emailVis === 'onlyMe' && (
              <OnlyMeIcon
                sx={{
                  color: 'grey',
                  my: 'auto',
                  fontSize: '18px',
                }}
              />
            )}
            {emailVis === 'friends' && (
              <FriendsIcon
                sx={{
                  color: 'grey',
                  my: 'auto',
                  fontSize: '18px',
                }}
              />
            )}
            {emailVis === 'public' && (
              <PublicIcon
                sx={{
                  color: 'grey',
                  my: 'auto',
                  fontSize: '18px',
                }}
              />
            )}
          </IconButton>
          <Menu
            id="email-vis-menu"
            anchorEl={anchorEl}
            open={!!anchorEl?.classList.contains('email-vis-button')}
            onClose={() => handleClose('email')}
            MenuListProps={{
              'aria-labelledby': 'basic-button-email',
            }}
          >
            <MenuItem onClick={() => handleClose('email', 'onlyMe')}>
              <OnlyMeIcon
                sx={{
                  color: 'grey',
                  my: 'auto',
                  fontSize: '18px',
                  mr: 2,
                }}
              />
              Only Me
            </MenuItem>
            <MenuItem onClick={() => handleClose('email', 'friends')}>
              <FriendsIcon
                sx={{
                  color: 'grey',
                  my: 'auto',
                  fontSize: '18px',
                  mr: 2,
                }}
              />
              Friend
            </MenuItem>
            <MenuItem onClick={() => handleClose('email', 'public')}>
              <PublicIcon
                sx={{
                  color: 'grey',
                  my: 'auto',
                  fontSize: '18px',
                  mr: 2,
                }}
              />
              Public
            </MenuItem>
          </Menu>
        </Box>
      </Stack>
      {/* DOB Input */}
      <Stack direction="row" spacing={2}>
        <DOBIcon color="secondary" sx={{ my: 'auto' }} />
        <CustomTextField
          InputProps={{ disableUnderline: true }}
          fullWidth
          variant="filled"
          label="Date de naissance"
          type="date"
          defaultValue={new Date().toISOString().slice(0, 10)}
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
      {/* Address Input */}
      <Stack direction="row" spacing={2}>
        <AddressIcon color="secondary" sx={{ my: 'auto' }} />
        <CustomTextField
          InputProps={{
            disableUnderline: true,
          }}
          variant="filled"
          label="Adress"
          defaultValue="18 Rue Nessrines, Hammamet 8050"
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
      {/* Phone Input */}
      <Stack direction="row" spacing={2}>
        <PhoneIcon color="secondary" sx={{ my: 'auto' }} />
        <CustomTextField
          InputProps={{
            disableUnderline: true,
          }}
          variant="filled"
          label="Telephone"
          defaultValue="(+216) 21 509 309"
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
