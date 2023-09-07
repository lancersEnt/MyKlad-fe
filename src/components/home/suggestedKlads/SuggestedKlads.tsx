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
import { RECOMENDED_KLADS } from '../../../utils/GraphQL/Queries';
import { Klad } from '../../../utils/Interfaces/Klad.interface';
import { BorderLinearProgress } from '../../settings/SecurityTab';

export default function Events() {
  const { data: recomendedKlads, loading, error } = useQuery(RECOMENDED_KLADS);
  return (
    <Box>
      <Typography variant="h6" component="h2" gutterBottom>
        Klads recommandé
      </Typography>
      {!loading &&
        recomendedKlads &&
        recomendedKlads.recommendedKlads.map((klad: Klad) => (
          <Card key={klad.id} sx={{ display: 'flex', mb: 3, borderRadius: 3 }}>
            <Grid container>
              <Grid item xs={12}>
                <CardMedia
                  component="img"
                  image={klad.pictureUrl}
                  alt={klad.name}
                  sx={{ height: '100%', width: '100%', maxHeight: '150px' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={`/klad/${klad.id}`}
                    >
                      <Typography
                        color="text.primary"
                        component="div"
                        variant="h6"
                        fontSize={14}
                      >
                        {klad.name}
                      </Typography>
                    </Link>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      component="div"
                    >
                      {`prix de part : ${klad.partPrice}$`}
                    </Typography>
                  </CardContent>
                  <Box sx={{ alignItems: 'center', px: 2, pb: 2 }}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        component="div"
                      >
                        {`collecté : ${klad.budgetCollected}$`}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        component="div"
                      >
                        {`besoin : ${klad.budgetNeeded}$`}
                      </Typography>
                    </Stack>
                    <BorderLinearProgress
                      value={(klad.budgetCollected / klad.budgetNeeded) * 100}
                      variant="determinate"
                      sx={{
                        mb: 1,
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>
        ))}
    </Box>
  );
}
