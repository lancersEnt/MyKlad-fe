import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { AttachMoney } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { updateBalance } from '../../features/auth/authSlice';
import { RootState } from '../../app/store';
import CustomTextField from '../common/inputs/CustomTextField';
import { UPDATE_BALANCE } from '../../utils/GraphQL/Mutations';

function MyKladPay() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const handleOpenDialog = () => {
    setIsOpen(true);
  };
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const [updateFunds] = useMutation(UPDATE_BALANCE);
  const handleUpdateBalance = () => {
    if (amount > 0) {
      updateFunds({
        variables: { amount },
        onCompleted() {
          dispatch(updateBalance(user.balance + amount));
          handleCloseDialog();
          setAmount(0);
        },
      });
    }
  };
  return (
    <Box>
      <Typography
        component="h2"
        variant="h5"
        fontSize={18}
        fontWeight={500}
        py="1rem"
        gutterBottom
      >
        MyKlad Pay
      </Typography>
      <Stack direction="row-reverse" sx={{ mb: 2 }}>
        <Button
          sx={{ textTransform: 'none', borderRadius: 5 }}
          variant="contained"
          onClick={handleOpenDialog}
        >
          Ajouter des fonds
        </Button>
      </Stack>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: '#fff',
                p: 2,
                borderRadius: 3,
                height: '7rem',
              }}
            >
              <Typography fontWeight={500} color="grey" gutterBottom>
                Solde
              </Typography>
              <Box display="flex">
                <Typography
                  color="primary"
                  fontWeight={500}
                  sx={{ p: 1, backgroundColor: '#F4F7FF', borderRadius: 3 }}
                >
                  {`${user.balance} $`}{' '}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: '#fff',
                p: 2,
                borderRadius: 3,
                height: '7rem',
              }}
            >
              <Typography fontWeight={500} color="grey" gutterBottom>
                Numero de compte
              </Typography>
              <Typography sx={{ p: 1 }}>{user.id}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        open={isOpen}
        onClose={handleCloseDialog}
        PaperProps={{ style: { width: '300px', borderRadius: '1rem' } }}
      >
        <DialogTitle>Ajouter des fonds</DialogTitle>
        <DialogContent>
          <CustomTextField
            fullWidth
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value, 10))}
            InputProps={{
              disableUnderline: true,
              endAdornment: <AttachMoney />,
            }}
            variant="filled"
            label="Montant"
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ textTransform: 'none', borderRadius: 5 }}
            variant="contained"
            onClick={handleUpdateBalance}
          >
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
export default MyKladPay;
