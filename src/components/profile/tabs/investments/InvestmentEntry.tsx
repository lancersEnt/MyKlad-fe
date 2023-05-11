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
import CircularProgressWithLabel from '../../../common/progressBar/CircularProgressWithLabel';

function InvestmentEntry(): ReactElement {
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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSXLN7hUoZHWo_4oshb2Aui9HJ5oTbHkxSSLiYbMfYkg&s"
              alt="institute"
              sx={{ my: 'auto', width: '60px', height: '60px' }}
            />
            <Stack display="flex" spacing={3}>
              <Box my="auto">
                <Typography sx={{ height: '100%' }}>
                  K2C Consulting
                  <Typography
                    variant="caption"
                    display="block"
                    style={{ color: 'grey' }}
                  >
                    0113Z - Culture de légumes, de melon, de racines et
                    tubercules
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
            <CircularProgressWithLabel value={82} size="8rem" thickness={4} />
          </Box>
        </Stack>
      </Box>
    </Grid>
  );
}

export default InvestmentEntry;
