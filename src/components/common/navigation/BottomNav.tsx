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

export default function BottomNav() {
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
      {/* <BottomNavigationAction
        label="Investissement"
        value="invests"
        icon={<BusinessCenterIcon />}
      />
      <BottomNavigationAction
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
        label="Saved"
        value="Saved"
        icon={<BookmarkIcon />}
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
