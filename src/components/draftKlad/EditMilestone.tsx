/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import { Milestone } from '../../utils/Interfaces/Milestone.interface';
import CustomTextField from '../common/inputs/CustomTextField';
import { UPDATE_MILESTONE } from '../../utils/GraphQL/Mutations';

interface EditMilestoneProps {
  handleCloseDialog: any;
  selectedMilestone: Milestone | undefined;
  refetch: any;
}

type FormValues = {
  name: string;
  dueDate: Date;
};

function EditMilestone({
  handleCloseDialog,
  selectedMilestone,
  refetch,
}: EditMilestoneProps) {
  const formSchema = Yup.object().shape({
    name: Yup.string().required('champ nom est obligatoire'),
    dueDate: Yup.date().required('champ date est obligatoire'),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(formOptions);

  const [editMileStone] = useMutation(UPDATE_MILESTONE);

  const onSubmit = handleSubmit(async (formValues) => {
    const date = moment
      .utc(formValues.dueDate.toLocaleString())
      .format('YYYY-MM-DD');
    formValues.dueDate = new Date(date);
    editMileStone({
      variables: {
        updateMilestoneId: selectedMilestone?.id,
        updateMilestoneInput: formValues,
      },
      onCompleted() {
        refetch();
        handleCloseDialog();
      },
    });
  });
  return (
    <Box>
      <form onSubmit={onSubmit}>
        <DialogTitle>Modifier date clé</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <CustomTextField
              InputProps={{ disableUnderline: true }}
              defaultValue={selectedMilestone?.name}
              variant="filled"
              label="Nom"
              sx={{
                border: errors?.name ? '1px solid #d32f2f' : 'none',
              }}
              fullWidth
              {...register('name')}
            />
            {errors?.name && (
              <Typography
                display={errors.name?.message ? 'block' : 'none'}
                sx={{
                  color: '#d32f2f',
                  marginTop: '0 !important',
                }}
                variant="caption"
              >
                {errors.name?.message}
              </Typography>
            )}
          </Box>
          <Box>
            <CustomTextField
              sx={{
                border: errors?.dueDate ? '1px solid #d32f2f' : 'none',
              }}
              InputProps={{ disableUnderline: true }}
              variant="filled"
              label="Date"
              type="date"
              defaultValue={selectedMilestone?.dueDate.slice(0, 10)}
              fullWidth
              {...register('dueDate')}
            />
            {errors?.dueDate && (
              <Typography
                display={errors.dueDate?.message ? 'block' : 'none'}
                sx={{
                  color: '#d32f2f',
                  marginTop: '0 !important',
                }}
                variant="caption"
              >
                {errors.dueDate?.message}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ textTransform: 'none', borderRadius: 5 }}
              type="submit"
            >
              Modifier
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ textTransform: 'none', borderRadius: 5 }}
              onClick={() => handleCloseDialog()}
            >
              Annuler
            </Button>
          </Stack>
        </DialogActions>
      </form>
    </Box>
  );
}

export default EditMilestone;
