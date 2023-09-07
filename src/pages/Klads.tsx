/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Recomended from '../components/klads/Recomended';
import { GET_CATEGORIES } from '../utils/GraphQL/Queries';
import { Category } from '../utils/Interfaces/Category.interface';
import Filtred from '../components/klads/Filtred';
import { RootState } from '../app/store';

interface Filters {
  categories: string[];
  subCategories: string[];
}

function Klads(): ReactElement {
  const user = useSelector((state: RootState) => state.auth.user);
  const [preference, setPreference] = useState(
    user.permissions.includes('page') ? 'filtred' : 'recomended'
  );
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    subCategories: [],
  });

  const handleCategoryChange = (event: any, categoryId: string) => {
    setPreference('filtred');
    const isChecked = event.target.checked;
    setFilters((prevFilters) => {
      if (isChecked) {
        return {
          ...prevFilters,
          categories: [...prevFilters.categories, categoryId],
        };
      }
      return {
        ...prevFilters,
        categories: prevFilters.categories.filter((id) => id !== categoryId),
      };
    });
  };

  const handleSubCategoryChange = (event: any, subCategoryId: string) => {
    setPreference('filtred');
    const isChecked = event.target.checked;
    setFilters((prevFilters) => {
      if (isChecked) {
        return {
          ...prevFilters,
          subCategories: [...prevFilters.subCategories, subCategoryId],
        };
      }
      return {
        ...prevFilters,
        subCategories: prevFilters.subCategories.filter(
          (id) => id !== subCategoryId
        ),
      };
    });
  };

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value === 'recomended')
      setFilters({
        categories: [],
        subCategories: [],
      });
    setPreference(event.target.value);
  };

  const { data: categories } = useQuery(GET_CATEGORIES);

  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{ pl: { xs: 0, sm: 0, md: '5rem' }, pt: '5rem' }}
      >
        <Grid item xs={3.5}>
          <Box
            sx={{
              p: 1,
              borderRadius: 3,
              backgroundColor: '#fff',
              mb: 2,
              height: 56,
              display: 'flex',
            }}
          >
            <Typography fontSize={16} fontWeight={700} sx={{ my: 'auto' }}>
              Filters
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1,
              borderRadius: 3,
              backgroundColor: '#fff',
              mb: 2,
            }}
          >
            <Typography fontSize={16} fontWeight={500}>
              Categories
            </Typography>
            {categories.categories.map((category: Category) => (
              <Box key={category.id}>
                <FormControlLabel
                  control={<Checkbox size="small" value={category.id} />}
                  label={<Typography fontSize={14}>{category.name}</Typography>}
                  checked={filters.categories.includes(category.id)}
                  onChange={(e) => handleCategoryChange(e, category.id)}
                />
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              p: 1,
              borderRadius: 3,
              backgroundColor: '#fff',
              mb: 2,
            }}
          >
            <Typography fontSize={16} fontWeight={500}>
              Sous Categories
            </Typography>
            {categories.categories.map((category: any) =>
              category.subCategories.map((sub: any) => (
                <Box key={sub.id}>
                  <FormControlLabel
                    sx={{ fontSize: 8 }}
                    control={<Checkbox size="small" value={sub.id} />}
                    label={<Typography fontSize={14}>{sub.name}</Typography>}
                    checked={filters.subCategories.includes(sub.id)}
                    onChange={(e) => handleSubCategoryChange(e, sub.id)}
                  />
                </Box>
              ))
            )}
          </Box>
        </Grid>
        <Grid item xs={8.5}>
          <Stack
            direction="row-reverse"
            sx={{ p: 1, borderRadius: 3, backgroundColor: '#fff', mb: 2 }}
          >
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={preference}
              label=""
              size="small"
              onChange={handleChange}
            >
              <MenuItem
                value="recomended"
                disabled={user.permissions.includes('page')}
              >
                Recommendé
              </MenuItem>
              <MenuItem value="filtred">Personalisé</MenuItem>
            </Select>
          </Stack>
          {preference === 'recomended' && <Recomended />}
          {preference === 'filtred' && <Filtred filter={filters} />}
        </Grid>
      </Grid>
    </Box>
  );
}
export default Klads;
