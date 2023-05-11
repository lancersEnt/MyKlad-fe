import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { ReactElement } from 'react';

import AddIcon from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/DeleteOutlineRounded';
import CustomTextField from '../../../../common/inputs/CustomTextField';
import CustomSelectField from '../../../../common/inputs/CustomSelectField';

function EducationForm(): ReactElement {
  return (
    <Box>
      <Stack direction="row-reverse" mb={3}>
        <Button
          color="secondary"
          size="large"
          variant="outlined"
          sx={{ borderRadius: 25, fontSize: 10 }}
        >
          <AddIcon sx={{ fontSize: 18, mr: 0.5 }} />
          Ajouter
        </Button>
      </Stack>
      <Box>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Box display="flex">
            <Box sx={{ display: 'inline-block' }} mr=".5rem">
              <Avatar src="https://media.istockphoto.com/id/525027270/vector/graduation-cap-vector-illustration-academy-hat-icon.jpg?s=612x612&amp;w=0&amp;k=20&amp;c=e34EEeoDsU5pBPji-J2aIdua0gB75378Efbl53P8TuY=" />
            </Box>
            <Typography
              component="h2"
              fontSize={16}
              fontWeight={500}
              lineHeight={2.25}
              display="inline-block"
              my="auto"
            >
              Licence appliquée en design Graphique
            </Typography>
          </Box>
          <Box>
            <IconButton
              color="secondary"
              size="large"
              sx={{
                borderRadius: 25,
                fontSize: 10,
                backgroundColor: '#F0F0F0',
              }}
            >
              <DeleteIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </Stack>
        <Box
          sx={{ borderRadius: 3, border: '1px solid lightgrey', py: 2, px: 3 }}
        >
          <Stack spacing={3} height="100%" justifyContent="center">
            <Stack direction="row" spacing={2}>
              <CustomTextField
                InputProps={{
                  disableUnderline: true,
                }}
                variant="filled"
                label="Ecole"
                defaultValue="Institut Superieur des Beaux Arts de Sousse"
                fullWidth
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <CustomTextField
                InputProps={{
                  disableUnderline: true,
                }}
                variant="filled"
                label="Diplome"
                defaultValue="Licence appliquée en design Graphique"
                fullWidth
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <FormControl
                sx={{
                  borderRadius: 3,
                  border: 'none',
                }}
                variant="filled"
                fullWidth
              >
                <InputLabel id="sex">Année debut</InputLabel>
                <CustomSelectField
                  sx={{
                    borderRadius: 3,
                  }}
                  fullWidth
                  disableUnderline
                  labelId="sex"
                  id="sex-select"
                  label="Genre"
                  variant="filled"
                  defaultValue="2007"
                >
                  <MenuItem value="2007">2007</MenuItem>
                  <MenuItem value="2008">2008</MenuItem>
                </CustomSelectField>
              </FormControl>
              <FormControl
                sx={{
                  borderRadius: 3,
                  border: 'none',
                }}
                variant="filled"
                fullWidth
              >
                <InputLabel id="sex">Année fin</InputLabel>
                <CustomSelectField
                  sx={{
                    borderRadius: 3,
                  }}
                  fullWidth
                  disableUnderline
                  labelId="sex"
                  id="sex-select"
                  label="Genre"
                  variant="filled"
                  defaultValue="2007"
                >
                  <MenuItem value="2007">2007</MenuItem>
                  <MenuItem value="2008">2008</MenuItem>
                </CustomSelectField>
              </FormControl>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
export default EducationForm;
