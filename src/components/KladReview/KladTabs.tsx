/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Box, Grid, Tab, Tabs } from '@mui/material';

import PublicationsIcon from '@mui/icons-material/ArticleOutlined';
import StarIcon from '@mui/icons-material/StarBorderOutlined';
import AboutIcon from '@mui/icons-material/InfoOutlined';
import DocumentIcon from '@mui/icons-material/PictureAsPdfOutlined';
import PictureIcon from '@mui/icons-material/PhotoAlbumOutlined';
import VideoIcon from '@mui/icons-material/VideocamOutlined';
import About from './Tabs/about/About';
import { Klad } from '../../utils/Interfaces/Klad.interface';
import Pictures from './Tabs/pictures/Pictures';
import Videos from './Tabs/videos/Videos';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
interface KladTabsProps {
  klad: Klad | null;
}
function KladTabs({ klad }: KladTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Tab
            icon={<AboutIcon />}
            iconPosition="start"
            label="A propos "
            sx={{ marginRight: '1rem' }}
            {...a11yProps(0)}
          />

          <Tab
            icon={<DocumentIcon />}
            iconPosition="start"
            label="Documents"
            sx={{ marginRight: '1rem' }}
            {...a11yProps(1)}
          />
          <Tab
            icon={<PictureIcon />}
            iconPosition="start"
            label="Photos"
            sx={{ marginRight: '1rem' }}
            {...a11yProps(2)}
          />
          <Tab
            icon={<VideoIcon />}
            iconPosition="start"
            label="Videos"
            sx={{ marginRight: '1rem' }}
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <About klad={klad} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box>Domcuments</Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Pictures pictures={klad?.pictures} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Videos videos={klad?.videos} />
      </TabPanel>
    </Box>
  );
}
export default KladTabs;
