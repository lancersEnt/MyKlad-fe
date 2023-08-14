/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import CustomTextField from '../common/inputs/CustomTextField';
import { ADD_PAGE } from '../../utils/GraphQL/Mutations';

interface CreatePageProps {
  open: boolean;
  handleClose: any;
}

type FormValues = {
  firstname: string;
  username: string;
  email: string;
};

function CreatePage({ open, handleClose }: CreatePageProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const formSchema = Yup.object().shape({
    firstname: Yup.string().required('champ prenom est obligatoire'),
    username: Yup.string().required("champ nom d'utilisateur est obligatoire"),
    email: Yup.string().required('Champ email est obligatoire'),
    // password: Yup.string().required('Champ mot de passe est obligatoire'),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(formOptions);

  const [addPage] = useMutation(ADD_PAGE, {
    onCompleted() {
      navigate(0);
    },
  });

  const onSubmit = handleSubmit(async (formValues) => {
    await addPage({
      variables: { createUserInput: { ...formValues, password: 'password' } },
    });
  });
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{
        style: {
          width: '450px',
        },
      }}
    >
      <form onSubmit={onSubmit}>
        <DialogTitle id="responsive-dialog-title">
          <Typography
            textAlign="center"
            gutterBottom
            variant="h5"
            fontWeight={500}
          >
            Créer une page
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {/* Input Prenom  */}
            <Box>
              <CustomTextField
                InputProps={{ disableUnderline: true }}
                variant="filled"
                label="Nom du page"
                sx={{
                  border: errors?.firstname ? '1px solid #d32f2f' : 'none',
                }}
                fullWidth
                {...register('firstname')}
              />
              {errors?.firstname && (
                <Typography
                  display={errors.firstname?.message ? 'block' : 'none'}
                  sx={{
                    color: '#d32f2f',
                    marginTop: '0 !important',
                  }}
                  variant="caption"
                >
                  {errors.firstname?.message}
                </Typography>
              )}
            </Box>

            {/* Input username  */}
            <Box>
              <CustomTextField
                InputProps={{ disableUnderline: true }}
                variant="filled"
                label="Username"
                sx={{
                  border: errors?.username ? '1px solid #d32f2f' : 'none',
                }}
                fullWidth
                {...register('username')}
              />
              {errors?.username && (
                <Typography
                  display={errors.username?.message ? 'block' : 'none'}
                  sx={{
                    color: '#d32f2f',
                    marginTop: '0 !important',
                  }}
                  variant="caption"
                >
                  {errors.username?.message}
                </Typography>
              )}
            </Box>
            {/* Input Email */}
            <Box>
              <CustomTextField
                InputProps={{ disableUnderline: true }}
                sx={{
                  border: errors?.email ? '1px solid #d32f2f' : 'none',
                }}
                variant="filled"
                label="Email"
                fullWidth
                {...register('email')}
              />
              {errors?.email && (
                <Typography
                  display={errors.email?.message ? 'block' : 'none'}
                  sx={{
                    color: '#d32f2f',
                    marginTop: '0 !important',
                  }}
                  variant="caption"
                >
                  {errors.email?.message}
                </Typography>
              )}
            </Box>

            {/* submit */}
            <Button
              size="large"
              sx={{ borderRadius: '50px', textTransform: 'unset' }}
              variant="contained"
              type="submit"
            >
              <Typography py=".5rem" fontSize=".8rem">
                S&apos;inscrire
              </Typography>
            </Button>
          </Stack>
        </DialogContent>
      </form>
    </Dialog>
  );
}
export default CreatePage;
