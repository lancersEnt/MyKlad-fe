/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement } from 'react';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import PublicIcon from '@mui/icons-material/PublicRounded';
import { Link } from 'react-router-dom';
import CircularProgressWithLabel from '../../../common/progressBar/CircularProgressWithLabel';
import { Investment } from '../../../../utils/Interfaces/Investment.interface';

interface InvestmentProps {
  investment: Investment;
}

function InvestmentEntry({ investment }: InvestmentProps): ReactElement {
  return (
    <Grid item xs={12}>
      <Box
        sx={{
          p: 1,
          borderRadius: 3,
          border: '1px solid #DEDEDE',
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            <Avatar
              src={investment.klad.pictureUrl}
              alt="institute"
              sx={{ my: 'auto', width: '60px', height: '60px' }}
            />
            <Stack display="flex" spacing={3}>
              <Box my="auto">
                <Typography sx={{ height: '100%' }}>
                  <Link
                    style={{
                      textDecoration: 'none',
                      textTransform: 'none',
                      color: 'black',
                    }}
                    to={`/klad/${investment.klad.id}`}
                  >
                    {investment.klad.name}
                  </Link>
                  <Typography
                    variant="caption"
                    display="block"
                    style={{ color: 'grey' }}
                  >
                    <Link
                      style={{
                        textDecoration: 'none',
                        textTransform: 'none',
                        color: 'grey',
                      }}
                      to={`/page/${investment.klad.owner.username}`}
                    >
                      {investment.klad.owner.firstname}
                    </Link>
                  </Typography>
                </Typography>
              </Box>
            </Stack>
          </Stack>
          {/* <Box display="flex">
            <CircularProgressWithLabel
              value={82}
              size="5rem"
              sx={{ my: 'auto' }}
              thickness={4}
            />
          </Box> */}
          <IconButton disabled>
            <PublicIcon
              sx={{
                color: 'grey',
                mb: 'auto',
                fontSize: 18,
              }}
            />
          </IconButton>
        </Stack>
        <Stack alignItems="center" mt={2}>
          <Box>
            <CircularProgressWithLabel
              variant="determinate"
              value={
                (investment.klad.budgetCollected /
                  investment.klad.budgetNeeded) *
                100
              }
              size="8rem"
              thickness={4}
            />
          </Box>
        </Stack>
      </Box>
    </Grid>
  );
}

export default InvestmentEntry;
