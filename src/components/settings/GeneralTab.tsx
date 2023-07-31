/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */

import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  SpeedDial,
  SpeedDialAction,
  Stack,
  Typography,
} from '@mui/material';
import { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { UploadDropzone } from 'react-uploader';
import * as Yup from 'yup';
import { Uploader } from 'uploader';

import {
  Close,
  CollectionsRounded,
  EditRounded,
  UploadRounded,
} from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { gql } from 'urql';
import moment from 'moment';
import { RootState } from '../../app/store';
import CustomTextField from '../common/inputs/CustomTextField';

const uploader = Uploader({ apiKey: 'public_kW15bZn8U7vFK5hjt2GgJgDvGkLy' }); // Your real API key.

type FormValues = {
  firstname: string;
  lastname: string;
  dateOfBirth: Date;
  city: string;
  nationality: string;
  address: string;
  phone: string;
};

const actions = [
  {
    id: 0,
    icon: <UploadRounded />,
    name: 'Télécharger depuis votre appareil',
  },
  {
    id: 1,
    icon: <CollectionsRounded />,
    name: 'Selectionner depuis vos photos MyKlad',
  },
];

const UPDATE_USER = gql`
  mutation Mutation(
    $updateUserId: String!
    $updateUserInput: UpdateUserInput!
  ) {
    updateUser(id: $updateUserId, updateUserInput: $updateUserInput) {
      id
    }
  }
`;

function GeneralTab(): ReactElement {
  const user = useSelector((state: RootState) => state.auth.user);
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    user.profilePictureUrl
  );
  const [imageTooltip, setImageTooltip] = useState(false);
  const [uploadDialog, setUploadDialog] = useState(false);

  const [updateUser] = useMutation(UPDATE_USER);

  const formSchema = Yup.object().shape({
    firstname: Yup.string().required('champ prenom est obligatoire'),
    lastname: Yup.string().required('champ nom est obligatoire'),
    dateOfBirth: Yup.date().required('champ date est obligatoire'),
    city: Yup.string().required('champ ville est obligatoire'),
    nationality: Yup.string().required('champ nationalité est obligatoire'),
    address: Yup.string().required('champ adresse est obligatoire'),
    phone: Yup.string().required('champ telephone est obligatoire'),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormValues>(formOptions);

  const onSubmit = handleSubmit(async (formValues) => {
    const date = moment
      .utc(formValues.dateOfBirth.toLocaleString())
      .format('YYYY-MM-DD');
    formValues.dateOfBirth = new Date(date);
    updateUser({
      variables: {
        updateUserId: user.id,
        updateUserInput: { ...formValues, profilePictureUrl },
      },
    });
    console.log({
      updateUserId: user.id,
      updateUserInput: { ...formValues, profilePictureUrl },
    });
  });

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Typography
          component="h2"
          variant="h5"
          fontSize={18}
          fontWeight={500}
          py="1rem"
          gutterBottom
        >
          Paramètres généraux
        </Typography>
        <Stack direction="row-reverse" spacing={2}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={
              isDirty ? false : user.profilePictureUrl === profilePictureUrl
            }
          >
            save
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              reset();
              setProfilePictureUrl(user.profilePictureUrl);
            }}
            disabled={
              isDirty ? false : user.profilePictureUrl === profilePictureUrl
            }
          >
            reset
          </Button>
        </Stack>
        <Typography
          component="h2"
          variant="h5"
          fontSize={14}
          fontWeight={500}
          py="1rem"
        >
          Photo de profile
        </Typography>
        <Box display="flex" justifyContent="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Box
                sx={{
                  height: 100,
                  width: 100,
                  transform: 'translateZ(0px)',
                  flexGrow: 1,
                }}
              >
                <SpeedDial
                  ariaLabel="SpeedDial basic example"
                  sx={{ position: 'absolute', bottom: 16, right: 16 }}
                  icon={<EditRounded />}
                  direction="left"
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      onClick={() => {
                        if (action.id === 0) {
                          setUploadDialog(!uploadDialog);
                        }
                      }}
                    />
                  ))}
                </SpeedDial>
              </Box>
            }
          >
            <Avatar
              sx={{ width: 250, height: 250 }}
              src={profilePictureUrl}
              alt="profile-pic"
              onClick={() => setImageTooltip(!imageTooltip)}
            />
          </Badge>
        </Box>
        <Typography
          component="h2"
          variant="h5"
          fontSize={14}
          fontWeight={500}
          py="1rem"
        >
          Informations personnelles
        </Typography>
        <Box>
          <Stack spacing={2}>
            <CustomTextField
              fullWidth
              InputProps={{ disableUnderline: true }}
              variant="filled"
              label="Prénom"
              defaultValue={user.firstname}
              {...register('firstname')}
            />
            <CustomTextField
              fullWidth
              InputProps={{ disableUnderline: true }}
              variant="filled"
              label="Nom de famille"
              defaultValue={user.lastname}
              {...register('lastname')}
            />
            <CustomTextField
              fullWidth
              InputProps={{ disableUnderline: true }}
              variant="filled"
              type="date"
              defaultValue={new Date(user.dateOfBirth)
                .toISOString()
                .slice(0, 10)}
              label="Date de naissance"
              {...register('dateOfBirth')}
            />
            <CustomTextField
              fullWidth
              InputProps={{ disableUnderline: true }}
              variant="filled"
              label="ville"
              defaultValue={user.city}
              {...register('city')}
            />
            <CustomTextField
              fullWidth
              InputProps={{ disableUnderline: true }}
              variant="filled"
              label="Nationalité"
              defaultValue={user.nationality}
              {...register('nationality')}
            />
            <CustomTextField
              fullWidth
              InputProps={{ disableUnderline: true }}
              variant="filled"
              label="Addresse de domiciliation"
              defaultValue={user.address}
              {...register('address')}
            />
            <CustomTextField
              fullWidth
              InputProps={{ disableUnderline: true }}
              type="email"
              variant="filled"
              label="Email"
              disabled
              defaultValue={user.email}
            />
            <CustomTextField
              fullWidth
              InputProps={{ disableUnderline: true }}
              variant="filled"
              label="Tél. Portable"
              defaultValue={user.phone}
              {...register('phone')}
            />
          </Stack>
        </Box>
        <Dialog
          open={uploadDialog}
          onClose={() => setUploadDialog(false)}
          fullScreen
        >
          <Box width="100%" height="100%" sx={{ position: 'relative' }}>
            <Close
              sx={{
                position: 'absolute',
                right: 10,
                top: 10,
                color: 'white',
                backgroundColor: '#305CE9',
                p: 1,
                zIndex: 20,
                borderRadius: '50%',
                width: 30,
                height: 30,
                cursor: 'pointer',
              }}
              onClick={() => setUploadDialog(false)}
            />
            <UploadDropzone
              uploader={uploader}
              options={{
                showRemoveButton: true,
                multi: false,
                mimeTypes: ['image/jpeg'],
                editor: {
                  images: {
                    crop: true,
                    cropRatio: 1,
                    cropShape: 'circ',
                    preview: true,
                  },
                },
              }}
              onUpdate={(files) => {
                setProfilePictureUrl(files[0].fileUrl);
                setUploadDialog(false);
              }}
              width="100%"
              height="100%"
            />
          </Box>
        </Dialog>
      </form>
    </Box>
  );
}

export default GeneralTab;
