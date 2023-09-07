/* eslint-disable no-nested-ternary */
import { AddOutlined, DeleteOutlined, EditOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Milestone } from '../../utils/Interfaces/Milestone.interface';
import { dateToMonthYear } from '../../utils/dateUtils';
import AddMilestone from './AddMilestone';
import EditMilestone from './EditMilestone';
import DeleteMilestone from './DeleteMilestone';

interface MilestonesProps {
  milestones: Milestone[];
  refetch: any;
}
enum DialogOptions {
  Ajouter,
  Modifier,
  Supprimer,
}

function Milestones({ milestones, refetch }: MilestonesProps) {
  const { kladId } = useParams();
  const [milestoneDialog, setMilestoneDialog] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<
    Milestone | undefined
  >(undefined);

  const [action, setAction] = useState<DialogOptions>(DialogOptions.Ajouter);

  function handleOpenDialog(milestone?: Milestone) {
    setSelectedMilestone(milestone);
    setMilestoneDialog(true);
  }
  function handleCloseDialog() {
    setSelectedMilestone(undefined);
    setMilestoneDialog(false);
  }

  return (
    <Box mb={4}>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography component="h2" variant="h6" fontWeight={500} gutterBottom>
          Dates clés prévisionnelles
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{ borderRadius: 5, textTransform: 'none' }}
          onClick={() => {
            setAction(DialogOptions.Ajouter);
            handleOpenDialog();
          }}
        >
          <AddOutlined />
          Ajouter
        </Button>
      </Stack>
      <Box>
        {milestones.map((milestone) => (
          <Box key={milestone.id}>
            <Stack
              key={milestone.id}
              direction="row"
              spacing={2}
              px={2}
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={2}>
                <Typography
                  fontSize={16}
                  color="secondary"
                  width={50}
                  fontWeight={500}
                >
                  {new Date(milestone.dueDate).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </Typography>
                <Typography
                  maxWidth={{ xs: 150, sm: 250, lg: 420, xl: 520 }}
                  textOverflow="ellipsis"
                  overflow="hidden"
                >
                  {milestone.name}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <IconButton
                  sx={{
                    backgroundColor: 'white',
                    ':hover': {
                      backgroundColor: 'white',
                    },
                  }}
                  size="small"
                  onClick={() => {
                    setAction(DialogOptions.Modifier);
                    handleOpenDialog(milestone);
                  }}
                >
                  <EditOutlined fontSize="small" />
                </IconButton>
                <IconButton
                  sx={{
                    backgroundColor: 'white',
                    ':hover': {
                      backgroundColor: 'white',
                    },
                  }}
                  size="small"
                  onClick={() => {
                    setAction(DialogOptions.Supprimer);
                    handleOpenDialog(milestone);
                  }}
                >
                  <DeleteOutlined fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
            <Divider sx={{ my: 3 }} />
          </Box>
        ))}
      </Box>
      <Dialog
        open={milestoneDialog}
        onClose={() => handleCloseDialog()}
        PaperProps={{ style: { minWidth: '375px', borderRadius: '.75rem' } }}
      >
        {action === DialogOptions.Ajouter && (
          <AddMilestone
            handleCloseDialog={() => handleCloseDialog()}
            refetch={refetch}
          />
        )}

        {action === DialogOptions.Modifier && (
          <EditMilestone
            handleCloseDialog={() => handleCloseDialog()}
            selectedMilestone={selectedMilestone}
            refetch={refetch}
          />
        )}

        {action === DialogOptions.Supprimer && (
          <DeleteMilestone
            handleCloseDialog={() => handleCloseDialog()}
            selectedMilestone={selectedMilestone}
            refetch={refetch}
          />
        )}
      </Dialog>
    </Box>
  );
}

export default Milestones;
