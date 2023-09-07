/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';

import PublicationsIcon from '@mui/icons-material/ArticleOutlined';
import StarIcon from '@mui/icons-material/StarBorderOutlined';
import AboutIcon from '@mui/icons-material/InfoOutlined';
import DocumentIcon from '@mui/icons-material/PictureAsPdfOutlined';
import PictureIcon from '@mui/icons-material/PhotoAlbumOutlined';
import VideoIcon from '@mui/icons-material/VideocamOutlined';
import LinkIcon from '@mui/icons-material/LinkOutlined';

import PagePublications from './tabs/PagePublications';
import About from './tabs/About';
import PageSidePanel from './SidePanel';
import Klads from './tabs/Klads/Klads';
import Pictures from './tabs/Pictures';
import Videos from './tabs/Videos';
import User from '../../utils/Interfaces/User.interface';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  page: User | null;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, page, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xs={0}
          sm={0}
          md={4}
          lg={4}
          xl={3}
          display={{ xs: 'none', sm: 'none', md: 'block' }}
        >
          <Box sx={{ py: 3 }}>
            <PageSidePanel page={page} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={9}>
          {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </Grid>
      </Grid>
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface PageTabsProps {
  page: User;
}

function PageTabs({ page }: PageTabsProps) {
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
            label="Acceuil"
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
            icon={<StarIcon />}
            iconPosition="start"
            label="Klads"
            sx={{ marginRight: '1rem' }}
            {...a11yProps(2)}
          />
          <Tab
            icon={<DocumentIcon />}
            iconPosition="start"
            label="Documents"
            sx={{ marginRight: '1rem' }}
            {...a11yProps(3)}
          />
          <Tab
            icon={<PictureIcon />}
            iconPosition="start"
            label="Photos"
            sx={{ marginRight: '1rem' }}
            {...a11yProps(4)}
          />
          <Tab
            icon={<VideoIcon />}
            iconPosition="start"
            label="Videos"
            sx={{ marginRight: '1rem' }}
            {...a11yProps(5)}
          />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0} page={page}>
        <PagePublications posts={page.posts} />
      </TabPanel>
      <TabPanel value={value} index={1} page={page}>
        <About />
      </TabPanel>
      <TabPanel value={value} index={2} page={page}>
        <Klads klads={page.klads} />
      </TabPanel>
      <TabPanel value={value} index={3} page={page}>
        Item 3: Documents
      </TabPanel>
      <TabPanel value={value} index={4} page={page}>
        <Pictures
          pictures={page.posts.filter((post) => post.type === 'image')}
        />
      </TabPanel>
      <TabPanel value={value} index={5} page={page}>
        <Videos videos={page.posts.filter((post) => post.type === 'video')} />
      </TabPanel>
    </Box>
  );
}
export default PageTabs;
