/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { Box, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import React, { ReactElement } from 'react';

import GeneralSettingsIcon from '@mui/icons-material/SettingsRounded';
import SecurityIcon from '@mui/icons-material/ShieldOutlined';
import ConfidentialityIcon from '@mui/icons-material/LockOutlined';
import BlockIcon from '@mui/icons-material/BlockOutlined';
import LanguageIcon from '@mui/icons-material/TranslateOutlined';
import PaymentsIcon from '@mui/icons-material/PaymentsOutlined';
import GeneralTab from '../components/settings/GeneralTab';
import SecurityTab from '../components/settings/SecurityTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ flex: 1 }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
    py: '55rem',
  };
}

function Settings(): ReactElement {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        // bgcolor: 'background.paper',
        display: 'flex',
        height: '100vh',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
        }}
      >
        <Tab
          sx={{ py: 4, display: 'block', alignItems: 'start' }}
          label={
            <Box>
              <GeneralSettingsIcon
                sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}
              />
              <Grid
                container
                spacing={2}
                display={{ xs: 'none', sm: 'none', md: 'flex' }}
              >
                <Grid item>
                  <GeneralSettingsIcon />
                </Grid>
                <Grid item>
                  <Typography fontSize={12} textTransform="capitalize">
                    Général
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          }
          wrapped
          {...a11yProps(0)}
        />
        <Tab
          sx={{ py: 4, display: 'block', alignItems: 'start' }}
          label={
            <Box>
              <SecurityIcon
                sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}
              />
              <Grid
                container
                spacing={2}
                display={{ xs: 'none', sm: 'none', md: 'flex' }}
              >
                <Grid item>
                  <SecurityIcon />
                </Grid>
                <Grid item>
                  <Typography fontSize={12} textTransform="capitalize">
                    Sécurité et connexion
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          }
          wrapped
          {...a11yProps(1)}
        />
        <Tab
          sx={{ py: 4, display: 'block', alignItems: 'start' }}
          label={
            <Box>
              <ConfidentialityIcon
                sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}
              />
              <Grid
                container
                spacing={2}
                display={{ xs: 'none', sm: 'none', md: 'flex' }}
              >
                <Grid item>
                  <ConfidentialityIcon />
                </Grid>
                <Grid item>
                  <Typography fontSize={12} textTransform="capitalize">
                    Confidentialité
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          }
          wrapped
          {...a11yProps(2)}
        />
        <Tab
          sx={{ py: 4, display: 'block', alignItems: 'start' }}
          label={
            <Box>
              <BlockIcon
                sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}
              />
              <Grid
                container
                spacing={2}
                display={{ xs: 'none', sm: 'none', md: 'flex' }}
              >
                <Grid item>
                  <BlockIcon />
                </Grid>
                <Grid item>
                  <Typography fontSize={12} textTransform="capitalize">
                    Blocage
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          }
          wrapped
          {...a11yProps(3)}
        />
        <Tab
          sx={{ py: 4, display: 'block', alignItems: 'start' }}
          label={
            <Box>
              <LanguageIcon
                sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}
              />
              <Grid
                container
                spacing={2}
                display={{ xs: 'none', sm: 'none', md: 'flex' }}
              >
                <Grid item>
                  <LanguageIcon />
                </Grid>
                <Grid item>
                  <Typography fontSize={12} textTransform="capitalize">
                    Langue et region
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          }
          wrapped
          {...a11yProps(4)}
        />
        <Tab
          sx={{ py: 4, display: 'block', alignItems: 'start' }}
          label={
            <Box>
              <PaymentsIcon
                sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}
              />
              <Grid
                container
                spacing={2}
                display={{ xs: 'none', sm: 'none', md: 'flex' }}
              >
                <Grid item>
                  <PaymentsIcon />
                </Grid>
                <Grid item>
                  <Typography fontSize={12} textTransform="capitalize">
                    MyKlad Pay
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          }
          wrapped
          {...a11yProps(5)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <GeneralTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SecurityTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Confidentialité
      </TabPanel>
      <TabPanel value={value} index={3}>
        Blocage
      </TabPanel>
      <TabPanel value={value} index={4}>
        Langue et région
      </TabPanel>
      <TabPanel value={value} index={5}>
        MyKlad Pay
      </TabPanel>
    </Box>
  );
}

export default Settings;
