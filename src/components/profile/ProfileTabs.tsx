/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Box, Tab, Tabs } from '@mui/material';

import PublicationsIcon from '@mui/icons-material/ArticleOutlined';
import AboutIcon from '@mui/icons-material/InfoOutlined';
import InvestIcon from '@mui/icons-material/LocalAtmOutlined';
import PagesIcon from '@mui/icons-material/FileCopyOutlined';

import Publications from './tabs/Publications';
import About from './tabs/about/About';
import Investments from './tabs/investments/Investments';
import User from '../../utils/Interfaces/User.interface';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
interface ProfileTabsProps {
  user: User;
}

function ProfileTabs({ user }: ProfileTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          <Tab
            icon={<PublicationsIcon />}
            iconPosition="start"
            label="Publication"
            sx={{ marginRight: '1rem' }}
            {...a11yProps(0)}
          />
          <Tab
            icon={<AboutIcon />}
            iconPosition="start"
            label="A propos "
            sx={{ marginRight: '1rem' }}
            {...a11yProps(1)}
          />
          <Tab
            icon={<InvestIcon />}
            iconPosition="start"
            label="Investissements"
            sx={{ marginRight: '1rem' }}
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Publications posts={user.posts} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <About user={user} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Investments investments={user.investments} />
      </TabPanel>
    </Box>
  );
}
export default ProfileTabs;
