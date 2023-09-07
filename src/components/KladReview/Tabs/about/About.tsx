/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement } from 'react';
import { useTheme } from '@mui/material/styles';

import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
} from '@mui/lab';
import AboutSidePanel from './AboutSidePanel';
import { Klad } from '../../../../utils/Interfaces/Klad.interface';
import { dateToNormalFormat } from '../../../../utils/dateUtils';

interface AboutProps {
  klad: Klad | null;
}
function About({ klad }: AboutProps): ReactElement {
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
    <Grid container spacing={4}>
      <Grid
        item
        xs={0}
        sm={0}
        md={5}
        lg={5}
        xl={5}
        display={{ xs: 'none', sm: 'none', md: 'block' }}
      >
        <AboutSidePanel klad={klad} />
      </Grid>
      <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
        <Typography fontSize={16} fontWeight={500}>
          Dates Clés
        </Typography>
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                sx={{ borderColor: 'transparent' }}
                variant="outlined"
              />
              <TimelineConnector sx={{ py: 1 }} />
            </TimelineSeparator>
            <TimelineContent />
          </TimelineItem>
          {klad?.milestones.map((milestone) => (
            <TimelineItem key={milestone.id}>
              <TimelineSeparator>
                <TimelineDot sx={{ borderColor: 'white' }} color="primary" />
                <TimelineConnector sx={{ py: 4 }} />
              </TimelineSeparator>
              <TimelineContent my={-4}>
                <Box
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    borderRadius: 3,
                    boxShadow: 1,
                    p: 2,
                  }}
                >
                  <Typography color="secondary">
                    {new Date(milestone.dueDate).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Typography>
                  <Typography
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '1',
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {milestone.name}
                  </Typography>
                </Box>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Grid>
    </Grid>
  );
}
export default About;
