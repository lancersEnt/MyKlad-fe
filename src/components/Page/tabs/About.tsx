/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement } from 'react';
import { useTheme } from '@mui/material/styles';

import { Box, Typography, useMediaQuery } from '@mui/material';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
} from '@mui/lab';

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

        <TimelineItem>
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
              <Typography color="secondary">Title</Typography>
              <Typography
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '1',
                  WebkitBoxOrient: 'vertical',
                }}
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere
                harum animi saepe at dignissimos quibusdam, Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Eaque culpa eos, tempora
                hic obcaecati, amet porro aliquid fugiat accusamus velit commodi
                minima ipsam earum iure, molestiae adipisci nulla voluptatibus
                odio.
              </Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
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
              <Typography color="secondary">Title</Typography>
              <Typography
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '1',
                  WebkitBoxOrient: 'vertical',
                }}
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere
                harum animi saepe at dignissimos quibusdam, Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Eaque culpa eos, tempora
                hic obcaecati, amet porro aliquid fugiat accusamus velit commodi
                minima ipsam earum iure, molestiae adipisci nulla voluptatibus
                odio.
              </Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={{ borderColor: 'white' }} color="primary" />
            <TimelineConnector sx={{ py: 1 }} />
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
              <Typography color="secondary">Title</Typography>
              <Typography
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '1',
                  WebkitBoxOrient: 'vertical',
                }}
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere
                harum animi saepe at dignissimos quibusdam, Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Eaque culpa eos, tempora
                hic obcaecati, amet porro aliquid fugiat accusamus velit commodi
                minima ipsam earum iure, molestiae adipisci nulla voluptatibus
                odio.
              </Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
  );
}
export default About;
