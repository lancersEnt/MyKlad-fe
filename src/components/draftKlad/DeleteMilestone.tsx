import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
} from '@mui/material';
import React from 'react';
import { useMutation } from '@apollo/client';
import { Milestone } from '../../utils/Interfaces/Milestone.interface';
import { DELETE_MILESTONE } from '../../utils/GraphQL/Mutations';

interface DeleteMilestoneProps {
  handleCloseDialog: any;
  selectedMilestone: Milestone | undefined;
  refetch: any;
}
function DeleteMilestone({
  handleCloseDialog,
  selectedMilestone,
  refetch,
}: DeleteMilestoneProps) {
  const [deleteMileStone] = useMutation(DELETE_MILESTONE);

  return (
    <Box>
      <DialogTitle>Supprimer date clé</DialogTitle>
      <DialogContent>
        <Box px={2}>Voulez-vous vraiment supprimer cette date clé ?</Box>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            sx={{ textTransform: 'none', borderRadius: 5 }}
            onClick={() => {
              deleteMileStone({
                variables: { removeMilestoneId: selectedMilestone?.id },
                onCompleted() {
                  refetch();
                },
              });
              handleCloseDialog();
            }}
          >
            Supprimer
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            sx={{ textTransform: 'none', borderRadius: 5 }}
            onClick={() => handleCloseDialog()}
          >
            Annuler
          </Button>
        </Stack>
      </DialogActions>
    </Box>
  );
}

export default DeleteMilestone;
