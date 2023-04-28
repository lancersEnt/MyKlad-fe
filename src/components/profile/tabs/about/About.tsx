/* eslint-disable no-nested-ternary */
import React, { ReactElement } from 'react';
import { useTheme } from '@mui/material/styles';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  useMediaQuery,
} from '@mui/material';

import GeneralInfo from './GeneralInfo';
import Education from './Education';
import Experience from './Experience';
import GeneralInfoForm from './forms/GeneralInfoForm';

function About(): ReactElement {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = (c: number) => {
    setContent(c);
    setOpen(true);
  };

  const handleClose = () => {
    setContent(0);
    setOpen(false);
  };
  return (
    <Box>
      <GeneralInfo editInfo={handleClickOpen} />
      <Education editEdu={handleClickOpen} />
      <Experience editExp={handleClickOpen} />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="about-edit"
        PaperProps={{
          sx: {
            backgroundColor: '#F4F7F9',
            borderRadius: 3,
            width: { md: '500px', lg: '750px' },
            px: 3,
          },
        }}
      >
        <DialogTitle id="about-edit">
          {content === 1
            ? 'Informations générales'
            : content === 2
            ? 'Formations'
            : 'Experience'}
        </DialogTitle>
        <Divider />
        <DialogContent>{content === 1 && <GeneralInfoForm />}</DialogContent>
        <Divider />
        <DialogActions sx={{ justifyContent: 'center', py: 2 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            color="secondary"
            sx={{ borderRadius: 25 }}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
            color="primary"
            sx={{ borderRadius: 25 }}
          >
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
export default About;
