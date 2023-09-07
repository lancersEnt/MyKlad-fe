/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Avatar,
  Box,
  Button,
  Chip,
  CssBaseline,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import {
  AddOutlined,
  BlockOutlined,
  DeleteOutline,
  DeleteOutlined,
  EditOutlined,
  RemoveOutlined,
} from '@mui/icons-material';
import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import { useSelector } from 'react-redux';
import frenchLocaleText from '../utils/dataGridFrench.locale';
import { USERS } from '../utils/GraphQL/Queries';
import { RootState } from '../app/store';
import Unauthorized from './Errors/Unauthorized';
import {
  ADD_EXPERT,
  BLOCK_UNBLOCK,
  REMOVE_EXPERT,
} from '../utils/GraphQL/Mutations';

function Admin() {
  const user = useSelector((state: RootState) => state.auth.user);

  if (user.permissions.includes('admin')) {
    const { data, refetch } = useQuery(USERS);
    const [blockUnblock] = useMutation(BLOCK_UNBLOCK);
    const [addExpert] = useMutation(ADD_EXPERT);
    const [removeExpert] = useMutation(REMOVE_EXPERT);
    const handleRemoveExpertPermission = (params: GridCellParams) => {
      removeExpert({
        variables: { userId: params.row.id },
        onCompleted() {
          refetch();
        },
      });
    };
    const handleAddExpertPermission = (params: GridCellParams) => {
      addExpert({
        variables: { userId: params.row.id },
        onCompleted() {
          refetch();
        },
      });
    };
    const handleBlockUnBlock = (params: GridCellParams) => {
      blockUnblock({
        variables: { userId: params.row.id },
        onCompleted() {
          refetch();
        },
      });
    };

    const columns: GridColDef[] = [
      {
        field: 'profilePictureUrl',
        headerName: '',
        width: 80,
        sortable: false,
        filterable: false,
        renderCell: (params: GridCellParams) => {
          return (
            <Box>
              <Avatar src={params.row.profilePictureUrl} />
            </Box>
          );
        },
      },
      {
        field: 'isActive',
        headerName: 'Etat',
        width: 100,
        renderCell: (params: GridCellParams) => {
          return (
            <Stack direction="row" spacing={2}>
              {params.row.isActive ? (
                <Chip
                  label="actif"
                  variant="outlined"
                  color="success"
                  size="small"
                />
              ) : (
                <Chip
                  label="inactif"
                  variant="outlined"
                  color="error"
                  size="small"
                />
              )}
            </Stack>
          );
        },
      },
      { field: 'firstname', headerName: 'Prenom', width: 200 },
      { field: 'lastname', headerName: 'Nom', width: 200 },
      { field: 'username', headerName: 'username', width: 200 },
      { field: 'email', headerName: 'Email', width: 250 },
      {
        field: 'dateOfBirth',
        headerName: 'Date de Naissance',
        type: 'string',
        width: 200,
        valueGetter: (params: GridValueGetterParams) =>
          `${new Date(params.row.dateOfBirth).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}`,
      },
      {
        field: 'permissions',
        headerName: 'Permissions',
        type: 'string',
        width: 200,
        renderCell: (params: GridCellParams) => {
          return (
            <Stack direction="row" spacing={2}>
              {params.row.permissions.includes('expert') && (
                <Chip
                  label="expert"
                  variant="outlined"
                  color="success"
                  size="small"
                />
              )}

              {params.row.permissions.includes('admin') && (
                <Chip
                  label="admin"
                  variant="outlined"
                  color="warning"
                  size="small"
                />
              )}
            </Stack>
          );
        },
      },
      {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        filterable: false,
        renderCell: (params: GridCellParams) => {
          return (
            <Stack direction="row" spacing={2}>
              <IconButton
                size="small"
                sx={{ textTransform: 'none', borderRadius: 5 }}
                onClick={() => handleBlockUnBlock(params)}
              >
                <BlockOutlined
                  color={params.row.isActive ? 'error' : 'success'}
                />
              </IconButton>
              {params.row.permissions.includes('expert') ? (
                <IconButton
                  size="small"
                  sx={{ textTransform: 'none', borderRadius: 5 }}
                  onClick={() => handleRemoveExpertPermission(params)}
                >
                  <RemoveOutlined />
                </IconButton>
              ) : (
                <IconButton
                  size="small"
                  sx={{ textTransform: 'none', borderRadius: 5 }}
                  onClick={() => handleAddExpertPermission(params)}
                >
                  <AddOutlined />
                </IconButton>
              )}
            </Stack>
          );
        },
        // Remove the width property for the action column to allow it to auto-size
      },
    ];
    return (
      <Box mb={5}>
        <Grid
          container
          spacing={10}
          sx={{ pl: { xs: 0, sm: 0, md: '5rem' }, pt: '5rem' }}
        >
          <Grid item xs={12} sm={12} lg={12}>
            <Box>
              <Typography fontSize={18} fontWeight={500} gutterBottom>
                Tableau de Bord
              </Typography>
              <Box sx={{ width: '100%', px: 2 }}>
                <Typography fontSize={14} fontWeight={500} gutterBottom>
                  liste des utilisateurs
                </Typography>
                {data && (
                  <DataGrid
                    sx={{ backgroundColor: '#FFF' }}
                    rows={data.users}
                    columns={columns}
                    localeText={frenchLocaleText} // Set the French translations
                    autoHeight // Set autoHeight to true
                    autoPageSize // Set autoPageSize to true
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                    disableRowSelectionOnClick // Disable row selection on click
                  />
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>

        <CssBaseline />
        <Box sx={{ mb: 5, height: 50 }} />
      </Box>
    );
  }
  return <Unauthorized />;
}
export default Admin;
