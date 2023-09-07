import { useState } from 'react';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

// icons
import HomeIcon from '@mui/icons-material/Home';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import VerifiedIcon from '@mui/icons-material/Verified';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { VerifiedOutlined } from '@mui/icons-material';
import { RootState } from '../../../app/store';

export default function BottomNav() {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const [value, setValue] = useState('home');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        height: '70px',
        overflowX: 'auto',
        maxWidth: '1000px',
        borderTopLeftRadius: '1.5rem',
        borderTopRightRadius: '1.5rem',
        justifyContent: 'flex-start',
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Accueuil"
        value="home"
        onClick={() => navigate('/', { preventScrollReset: false })}
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        label="kladeurs"
        value="friends"
        onClick={() => navigate('/kladers', { preventScrollReset: false })}
        icon={<PeopleOutlineIcon />}
      />
      <BottomNavigationAction
        label="Klads"
        value="invests"
        onClick={() => navigate('/klads', { preventScrollReset: false })}
        icon={<BusinessCenterIcon />}
      />
      {user.permissions.includes('expert') && (
        <BottomNavigationAction
          label="Klads"
          value="invests"
          onClick={() => navigate('/expert-hub', { preventScrollReset: false })}
          icon={<VerifiedOutlined />}
        />
      )}

      {/* <BottomNavigationAction
        label="favoris"
        value="Saved"
        icon={<BookmarkIcon />}
      /> */}
      {/* <BottomNavigationAction
        label="Connections"
        value="connections"
        icon={<Diversity2Icon />}
      />
      <BottomNavigationAction
        label="Brevets"
        value="Brevets"
        icon={<VerifiedIcon />}
      />
      <BottomNavigationAction
        label="Groups"
        value="Groups"
        icon={<GroupsIcon />}
      />
      <BottomNavigationAction
        label="Calendrier"
        value="Calendrier"
        icon={<CalendarMonthIcon />}
      /> */}
    </BottomNavigation>
  );
}
