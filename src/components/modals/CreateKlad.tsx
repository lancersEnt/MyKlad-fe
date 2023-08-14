/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CustomTextField from '../common/inputs/CustomTextField';
import { ADD_PAGE, CREATE_KLAD } from '../../utils/GraphQL/Mutations';
import { GET_CATEGORIES } from '../../utils/GraphQL/Queries';
import CustomSelectField from '../common/inputs/CustomSelectField';

interface CreateKladProps {
  open: boolean;
  handleClose: any;
}

type FormValues = {
  name: string;
  description: string;
  categoryId: string;
  subCategoryId: string;
  partPrice: number;
  minPartsPurchasable: number;
  maxPartsPurchasable: number;
  budgetNeeded: number;
};

function CreateKlad({ open, handleClose }: CreateKladProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [progress, setProgress] = useState(20);
  const formSchema = Yup.object().shape({
    name: Yup.string().required('champ nom est obligatoire'),
    description: Yup.string().required('champ description est obligatoire'),
    categoryId: Yup.string().required('champ categorie est obligatoire'),
    subCategoryId: Yup.string().required('champ souscategorie est obligatoire'),
    partPrice: Yup.number().required("prix de l'action est obligatoire"),
    minPartsPurchasable: Yup.number().required(
      "nombre minimum d'actions achetables est obligatoire"
    ),
    maxPartsPurchasable: Yup.number().required(
      "nombre maximum d'actions achetables est obligatoire"
    ),
    budgetNeeded: Yup.number().required('Champ budget est obligatoire'),
  });

  const [category, setCategory] = useState();
  const [subCategories, setSubCategories] = useState([]);

  const formOptions = { resolver: yupResolver(formSchema) };
  const [signedUp, setSignedUp] = useState(false);
  const { data: categories, loading, error } = useQuery(GET_CATEGORIES);
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>(formOptions);
  const watchedFields = watch(['categoryId']); // Watch specific fields
  const handleValueChange = (field: any) => (value: any) => {
    console.log(`Value of ${field}:`, value);

    const cat: any = categories.categories.filter(
      (cat: any) => cat.id === value.target.value
    );

    console.log(cat[0]);

    setCategory(cat[0]);
    setSubCategories(cat[0].subCategories);

    // Perform your desired action here
  };
  const [addKlad] = useMutation(CREATE_KLAD, {
    onCompleted() {
      navigate(0);
    },
  });

  const onSubmit = handleSubmit(async (formValues) => {
    await addKlad({
      variables: { createKladInput: formValues },
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
          <Typography textAlign="center" gutterBottom fontWeight={500}>
            Créer un Klad
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {/* Input nom projet  */}
            <Box>
              <CustomTextField
                InputProps={{ disableUnderline: true }}
                variant="filled"
                label="Nom du projet"
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

            {/* Input Description  */}
            <Box>
              <CustomTextField
                InputProps={{ disableUnderline: true }}
                variant="filled"
                label="Description"
                multiline
                sx={{
                  border: errors?.description ? '1px solid #d32f2f' : 'none',
                }}
                fullWidth
                {...register('description')}
              />
              {errors?.description && (
                <Typography
                  display={errors.description?.message ? 'block' : 'none'}
                  sx={{
                    color: '#d32f2f',
                    marginTop: '0 !important',
                  }}
                  variant="caption"
                >
                  {errors.description?.message}
                </Typography>
              )}
            </Box>
            {/* Input categorie */}
            <FormControl
              sx={{
                m: 1,
                borderRadius: 3,
                border: 'none',
              }}
              variant="filled"
              fullWidth
            >
              <InputLabel id="categorie">categorie</InputLabel>
              <CustomSelectField
                sx={{
                  borderRadius: 3,
                  border: errors?.categoryId ? '1px solid #d32f2f' : 'none',
                }}
                disableUnderline
                labelId="categorie"
                id="categorie-select"
                label="categorie"
                {...register('categoryId')}
                onChange={handleValueChange('categoryId')}
                variant="filled"
                defaultValue=""
              >
                {!loading &&
                  !error &&
                  categories &&
                  categories.categories.map((cat: any) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
              </CustomSelectField>
              {errors?.categoryId && (
                <Typography
                  display={errors.categoryId?.message ? 'block' : 'none'}
                  sx={{
                    color: '#d32f2f',
                    marginTop: '0 !important',
                  }}
                  variant="caption"
                >
                  {errors.categoryId?.message}
                </Typography>
              )}
            </FormControl>

            {/* Input souscategorie */}
            <FormControl
              sx={{
                m: 1,
                borderRadius: 3,
                border: 'none',
              }}
              variant="filled"
              disabled={!category}
              fullWidth
            >
              <InputLabel id="subcategorie">sous categorie</InputLabel>
              <CustomSelectField
                sx={{
                  borderRadius: 3,
                  border: errors?.subCategoryId ? '1px solid #d32f2f' : 'none',
                }}
                disableUnderline
                labelId="subcategorie"
                id="subcategorie-select"
                label="sous category"
                {...register('subCategoryId')}
                variant="filled"
                defaultValue=""
              >
                {subCategories.map((subCat: any) => (
                  <MenuItem key={subCat.id} value={subCat.id}>
                    {subCat.name}
                  </MenuItem>
                ))}
              </CustomSelectField>
              {errors?.categoryId && (
                <Typography
                  display={errors.categoryId?.message ? 'block' : 'none'}
                  sx={{
                    color: '#d32f2f',
                    marginTop: '0 !important',
                  }}
                  variant="caption"
                >
                  {errors.categoryId?.message}
                </Typography>
              )}
            </FormControl>

            {/* Input partPrice */}
            <Box>
              <CustomTextField
                InputProps={{ disableUnderline: true }}
                sx={{
                  border: errors?.partPrice ? '1px solid #d32f2f' : 'none',
                }}
                variant="filled"
                label="partPrice"
                type="number"
                fullWidth
                {...register('partPrice')}
              />
              {errors?.partPrice && (
                <Typography
                  display={errors.partPrice?.message ? 'block' : 'none'}
                  sx={{
                    color: '#d32f2f',
                    marginTop: '0 !important',
                  }}
                  variant="caption"
                >
                  {errors.partPrice?.message}
                </Typography>
              )}
            </Box>

            {/* Input minParts */}
            <Box>
              <CustomTextField
                InputProps={{ disableUnderline: true }}
                sx={{
                  border: errors?.minPartsPurchasable
                    ? '1px solid #d32f2f'
                    : 'none',
                }}
                variant="filled"
                label="minPartsPurchasable"
                type="number"
                fullWidth
                {...register('minPartsPurchasable')}
              />
              {errors?.minPartsPurchasable && (
                <Typography
                  display={
                    errors.minPartsPurchasable?.message ? 'block' : 'none'
                  }
                  sx={{
                    color: '#d32f2f',
                    marginTop: '0 !important',
                  }}
                  variant="caption"
                >
                  {errors.minPartsPurchasable?.message}
                </Typography>
              )}
            </Box>

            {/* Input maxParts */}
            <Box>
              <CustomTextField
                InputProps={{ disableUnderline: true }}
                sx={{
                  border: errors?.maxPartsPurchasable
                    ? '1px solid #d32f2f'
                    : 'none',
                }}
                variant="filled"
                label="maxPartsPurchasable"
                type="number"
                fullWidth
                {...register('maxPartsPurchasable')}
              />
              {errors?.maxPartsPurchasable && (
                <Typography
                  display={
                    errors.maxPartsPurchasable?.message ? 'block' : 'none'
                  }
                  sx={{
                    color: '#d32f2f',
                    marginTop: '0 !important',
                  }}
                  variant="caption"
                >
                  {errors.maxPartsPurchasable?.message}
                </Typography>
              )}
            </Box>

            {/* Input budget */}
            <Box>
              <CustomTextField
                InputProps={{ disableUnderline: true }}
                sx={{
                  border: errors?.budgetNeeded ? '1px solid #d32f2f' : 'none',
                }}
                variant="filled"
                label="budgetNeeded"
                type="number"
                fullWidth
                {...register('budgetNeeded')}
              />
              {errors?.budgetNeeded && (
                <Typography
                  display={errors.budgetNeeded?.message ? 'block' : 'none'}
                  sx={{
                    color: '#d32f2f',
                    marginTop: '0 !important',
                  }}
                  variant="caption"
                >
                  {errors.budgetNeeded?.message}
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
export default CreateKlad;
