import { Box, Button, Card, CardContent, Container, Grid } from '@mui/material';
import { useState } from 'react';
import AboutIcon from '@mui/icons-material/InfoOutlined';
import DocumentIcon from '@mui/icons-material/PictureAsPdfOutlined';
import PictureIcon from '@mui/icons-material/PhotoAlbumOutlined';
import VideoIcon from '@mui/icons-material/VideocamOutlined';
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material';
import DraftKladStepper from './DraftKladStepper';
import About from './About';
import Documents from './Documents';
import Pictures from './Pictures';
import Videos from './Videos';
import { Klad } from '../../utils/Interfaces/Klad.interface';

interface DraftKladBodyProps {
  klad: Klad;
  refetch: any;
}

function DraftKladBody({ klad, refetch }: DraftKladBodyProps) {
  const steps = [
    {
      label: 'A propos',
      icon: <AboutIcon sx={{ my: 'auto' }} fontSize="small" />,
      content: <About klad={klad} refetch={refetch} />,
    },
    {
      label: 'Documents',
      icon: <DocumentIcon sx={{ my: 'auto' }} fontSize="small" />,
      content: <Documents klad={klad} />,
    },
    {
      label: 'Photos',
      icon: <PictureIcon sx={{ my: 'auto' }} fontSize="small" />,
      content: <Pictures klad={klad} />,
    },
    {
      label: 'Videos',
      icon: <VideoIcon sx={{ my: 'auto' }} fontSize="small" />,
      content: <Videos klad={klad} />,
    },
  ];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4}>
          <Card elevation={0} sx={{ borderRadius: 2 }}>
            <CardContent sx={{ display: 'flex' }}>
              <DraftKladStepper activeStep={activeStep} steps={steps} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Container sx={{ mb: 4 }}>
            <Box>{steps[activeStep].content}</Box>
            <Box display="flex">
              <Button
                variant="contained"
                onClick={handleBack}
                sx={{
                  display: activeStep === 0 ? 'none' : 'flex',
                  backgroundColor: '#fff',
                  color: '#305CE9',
                  textTransform: 'none',
                  borderRadius: 5,
                  mt: 1,
                  mr: 'auto',
                  ':hover': {
                    color: '#fff',
                  },
                }}
              >
                <ChevronLeftOutlined />
                {activeStep > 0 && steps[activeStep - 1].label}
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  display: activeStep === 3 ? 'none' : 'flex',
                  backgroundColor: '#fff',
                  color: '#305CE9',
                  textTransform: 'none',
                  borderRadius: 5,
                  mt: 1,
                  ml: 'auto',
                  ':hover': {
                    color: '#fff',
                  },
                }}
              >
                {activeStep < 3 && steps[activeStep + 1].label}
                <ChevronRightOutlined />
              </Button>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}
export default DraftKladBody;
