import { useQuery } from '@apollo/client';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { BookmarkAddOutlined, ShareOutlined } from '@mui/icons-material';
import { FILTRED_KLADS, KLADS } from '../../utils/GraphQL/Queries';
import { Klad } from '../../utils/Interfaces/Klad.interface';
import { BorderLinearProgress } from '../settings/SecurityTab';
import KladEntry from '../common/KladEntry';

interface Filters {
  categories: string[];
  subCategories: string[];
}

interface FiltredProps {
  filter: Filters;
}
function Filtred({ filter }: FiltredProps) {
  const {
    data: filtredKlads,
    loading,
    error,
  } = useQuery(FILTRED_KLADS, {
    variables: { filter },
  });

  return (
    <Grid container spacing={2}>
      {!loading &&
        filtredKlads &&
        filtredKlads.filtredKlads.map((klad: Klad) => (
          <KladEntry key={klad.id} klad={klad} />
        ))}
    </Grid>
  );
}
export default Filtred;
