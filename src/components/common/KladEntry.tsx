import { useState } from 'react';
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
import { ShareOutlined } from '@mui/icons-material';
import { Klad } from '../../utils/Interfaces/Klad.interface';
import { BorderLinearProgress } from '../settings/SecurityTab';
import Share from '../modals/Share';

interface KladEntryProps {
  klad: Klad;
}

function KladEntry({ klad }: KladEntryProps) {
  const [shareKladModal, setShareKladModal] = useState(false);

  const [kladToShareId, setKladToShareId] = useState('');

  const handleCloseShareModal = () => {
    setShareKladModal(false);
  };

  const handleOpenShareModal = (kladId: string) => {
    setKladToShareId(kladId);
    setShareKladModal(true);
  };
  return (
    <Grid item key={klad.id} xs={12} md={6} lg={4}>
      <Card sx={{ display: 'flex', mb: 3, borderRadius: 3 }}>
        <Grid container>
          <Grid item xs={12}>
            <CardMedia
              component="img"
              image={klad.pictureUrl}
              alt={klad.name}
              sx={{
                height: '100%',
                width: '100%',
                maxHeight: '150px',
              }}
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
                    component="p"
                    variant="h6"
                    fontSize={14}
                    style={{
                      maxHeight: '1.5em', // Set the maximum height to 4 lines of text
                      overflow: 'hidden', // Hide any overflow beyond the specified height
                      display: '-webkit-box', // For compatibility with some browsers
                      WebkitLineClamp: 4, // Limit the number of displayed lines to 4
                      WebkitBoxOrient: 'vertical',
                    }}
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
                <Stack spacing={2} direction="row-reverse">
                  {/* <IconButton>
                  <BookmarkAddOutlined />
                </IconButton> */}
                  <IconButton onClick={() => handleOpenShareModal(klad.id)}>
                    <ShareOutlined />
                  </IconButton>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
      <Share
        open={shareKladModal}
        handleClose={handleCloseShareModal}
        kladId={kladToShareId}
      />
    </Grid>
  );
}
export default KladEntry;
