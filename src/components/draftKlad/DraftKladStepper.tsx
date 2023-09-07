/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';

interface DraftKladStepperProps {
  activeStep: number;
  steps: any[];
}

function DraftKladStepper({ activeStep, steps }: DraftKladStepperProps) {
  const theme = useTheme();
  const mid = useMediaQuery(theme.breakpoints.up('md'));
  const small = useMediaQuery(theme.breakpoints.down('md'));
  const xSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stepper
      activeStep={activeStep}
      orientation={small ? 'horizontal' : 'vertical'}
      sx={{ mx: 'auto' }}
    >
      {steps.map((step, index) => (
        <Step key={step.label}>
          <StepLabel>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                p: 1,
                backgroundColor: index === activeStep ? '#305CE915' : 'none',
                borderRadius: 2,
              }}
            >
              <Typography
                display="flex"
                color={
                  index > activeStep
                    ? 'grey'
                    : index < activeStep
                    ? '#000'
                    : '#305CE9'
                }
              >
                {step.icon}
              </Typography>
              {((small && !xSmall && activeStep === index) || mid) && (
                <Typography
                  color={
                    index > activeStep
                      ? 'grey'
                      : index < activeStep
                      ? '#000'
                      : '#305CE9'
                  }
                >
                  {step.label}
                </Typography>
              )}
            </Stack>
          </StepLabel>
          {/* <StepContent>
            <Typography>{step.description}</Typography>
            <Box sx={{ mb: 2 }}>
              <div>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {index === steps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </div>
            </Box>
          </StepContent> */}
        </Step>
      ))}
    </Stepper>
  );
}

export default DraftKladStepper;
