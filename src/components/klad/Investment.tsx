/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Klad } from '../../utils/Interfaces/Klad.interface';
import { BorderLinearProgress } from '../settings/SecurityTab';
import { RootState } from '../../app/store';
import { INVEST, UPDATE_BALANCE } from '../../utils/GraphQL/Mutations';
import { updateBalance } from '../../features/auth/authSlice';

interface InvestmentProps {
  klad: Klad;
}

function Investment({ klad }: InvestmentProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [collected, setCollected] = useState(klad.budgetCollected);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [invest] = useMutation(INVEST);
  const [investDialog, setInvestDialog] = useState(false);
  const [parts, setParts] = useState<number>(klad.minPartsPurchasable);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [isUpdatingBalance, setIsUpdatingBalance] = useState(false);

  const handleOpenDialog = () => {
    setInvestDialog(true);
  };

  const handleCloseDialog = () => {
    setInvestDialog(false);
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setParts(newValue as number);
  };

  const [updateFunds] = useMutation(UPDATE_BALANCE);

  return (
    <Box>
      <Stack direction="row" spacing={1} justifyContent="space-around">
        <Stack width="70%" spacing={0.25}>
          <Typography color="primary" fontWeight={500}>
            {`${collected} $ recuillis sur ${klad.budgetNeeded} $`}
          </Typography>
          <BorderLinearProgress
            sx={{ width: '100%' }}
            color="primary"
            value={(collected / klad.budgetNeeded) * 100}
            variant="determinate"
          />
          <Typography variant="caption">
            {`${klad.partPrice} $ la part, ${klad.minPartsPurchasable} min - ${klad.maxPartsPurchasable} max.`}
          </Typography>
        </Stack>
        {user.permissions.includes('user') && (
          <Box>
            <Button
              variant="contained"
              sx={{ borderRadius: 5, textTransform: 'none' }}
              onClick={handleOpenDialog}
            >
              Investir
            </Button>
          </Box>
        )}
      </Stack>
      <Dialog
        fullScreen={fullScreen}
        open={investDialog}
        onClose={handleCloseDialog}
        PaperProps={{ style: { minWidth: '350px' } }}
      >
        <DialogTitle>Investir</DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Typography
                component="p"
                variant="caption"
              >{`${klad.minPartsPurchasable} Min`}</Typography>
              <Slider
                aria-label="Parts"
                step={1}
                min={klad.minPartsPurchasable}
                max={klad.maxPartsPurchasable}
                value={parts}
                onChange={handleChange}
                sx={{ maxWidth: '60%' }}
              />
              <Typography
                component="p"
                variant="caption"
              >{`${klad.maxPartsPurchasable} Max`}</Typography>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Typography component="p" variant="caption">
                {`${parts} parts / ${parts * klad.partPrice} $`}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                sx={{ borderRadius: 5 }}
                onClick={() => {
                  setIsUpdatingBalance(true); // Disable the button
                  updateFunds({
                    variables: { amount: -parts * klad.partPrice },
                    onCompleted(res) {
                      if (res.updateBalance === 'success') {
                        dispatch(
                          updateBalance(user.balance - parts * klad.partPrice)
                        );
                        invest({
                          variables: {
                            createInvestmentInput: {
                              kladId: klad.id,
                              investorId: user.id,
                              partsPurchased: parts,
                            },
                          },
                          onCompleted() {
                            setIsUpdatingBalance(false);
                            setCollected(
                              (prev) => prev + parts * klad.partPrice
                            );
                            setParts(klad.minPartsPurchasable);
                            handleCloseDialog();
                          },
                        });
                      }
                    },
                  });
                }}
                disabled={isUpdatingBalance} // Disable the button when updating balance
              >
                {isUpdatingBalance ? 'Investing...' : 'Invest'}
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
export default Investment;
