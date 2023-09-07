import { useEffect, useState } from 'react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import CustomTextField from '../common/inputs/CustomTextField';
import Milestones from './Milestones';
import { Klad } from '../../utils/Interfaces/Klad.interface';
import { UPDATE_KLAD } from '../../utils/GraphQL/Mutations';

interface AboutProps {
  klad: Klad;
  refetch: any;
}

function About({ klad, refetch }: AboutProps) {
  const { kladId } = useParams();
  const [name, setName] = useState(klad.name);
  const [description, setDescription] = useState(klad.description);
  const [partPrice, setPartPrice] = useState(klad.partPrice);
  const [minPartsPurchasable, setMinPartsPurchasable] = useState(
    klad.minPartsPurchasable
  );
  const [maxPartsPurchasable, setMaxPartsPurchasable] = useState(
    klad.maxPartsPurchasable
  );
  const [budgetNeeded, setBudgetNeeded] = useState(klad.budgetNeeded);
  const [updateKlad] = useMutation(UPDATE_KLAD);

  useEffect(() => {
    setDescription(klad.description);
    setPartPrice(klad.partPrice);
    setMinPartsPurchasable(klad.minPartsPurchasable);
    setMaxPartsPurchasable(klad.maxPartsPurchasable);
    setBudgetNeeded(klad.budgetNeeded);
  }, [klad]);

  const aboutUpdated = () => {
    if (
      klad.name === name &&
      klad.description === description &&
      klad.partPrice === partPrice &&
      klad.budgetNeeded === budgetNeeded &&
      klad.maxPartsPurchasable === maxPartsPurchasable &&
      klad.minPartsPurchasable === minPartsPurchasable
    )
      return false;
    return true;
  };
  const handleUpdateAbout = () => {
    updateKlad({
      variables: {
        updateKladId: kladId,
        updateKladInput: {
          name,
          description,
          partPrice,
          minPartsPurchasable,
          maxPartsPurchasable,
          budgetNeeded,
        },
      },
      onCompleted() {
        refetch();
      },
    });
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography component="h2" variant="h5" fontWeight={500} gutterBottom>
          A propos
        </Typography>
        <Box>
          <Button
            size="small"
            variant="outlined"
            sx={{ textTransform: 'none', borderRadius: 5 }}
            disabled={!aboutUpdated()}
            onClick={handleUpdateAbout}
          >
            <SaveOutlined />
            Enregistrer
          </Button>
        </Box>
      </Stack>

      <CustomTextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom de projet"
        fullWidth
        variant="filled"
        label="Nom de projet"
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          mb: 2,
          backgroundColor: 'white',
          '& .MuiFilledInput-root': {
            backgroundColor: 'white',
            ':hover': {
              backgroundColor: 'white',
            },
            $focused: {
              backgroundColor: 'white',
            },
          },
        }}
      />

      <CustomTextField
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description de projet"
        multiline
        fullWidth
        variant="filled"
        label="Description de projet"
        minRows={3}
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          mb: 2,
          backgroundColor: 'white',
          '& .MuiFilledInput-root': {
            backgroundColor: 'white',
            ':hover': {
              backgroundColor: 'white',
            },
            $focused: {
              backgroundColor: 'white',
            },
          },
        }}
      />

      <CustomTextField
        value={partPrice}
        onChange={(e) => setPartPrice(Number.parseFloat(e.target.value))}
        type="number"
        placeholder="Description de projet"
        fullWidth
        variant="filled"
        label="Prix d'action"
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          mb: 2,
          backgroundColor: 'white',
          '& .MuiFilledInput-root': {
            backgroundColor: 'white',
            ':hover': {
              backgroundColor: 'white',
            },
            $focused: {
              backgroundColor: 'white',
            },
          },
        }}
      />

      <CustomTextField
        value={minPartsPurchasable}
        onChange={(e) =>
          setMinPartsPurchasable(Number.parseInt(e.target.value, 10))
        }
        type="number"
        placeholder="Actions min. à acheter"
        fullWidth
        variant="filled"
        label="Actions min. à acheter"
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          mb: 2,
          backgroundColor: 'white',
          '& .MuiFilledInput-root': {
            backgroundColor: 'white',
            ':hover': {
              backgroundColor: 'white',
            },
            $focused: {
              backgroundColor: 'white',
            },
          },
        }}
      />

      <CustomTextField
        value={maxPartsPurchasable}
        onChange={(e) => setPartPrice(Number.parseInt(e.target.value, 10))}
        type="number"
        placeholder="Max. d'actions achetables"
        fullWidth
        variant="filled"
        label="Max. d'actions achetables"
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          mb: 2,
          backgroundColor: 'white',
          '& .MuiFilledInput-root': {
            backgroundColor: 'white',
            ':hover': {
              backgroundColor: 'white',
            },
            $focused: {
              backgroundColor: 'white',
            },
          },
        }}
      />

      <CustomTextField
        value={budgetNeeded}
        onChange={(e) => setBudgetNeeded(Number.parseFloat(e.target.value))}
        type="number"
        placeholder="Montant à collecter"
        fullWidth
        variant="filled"
        label="Montant à collecter"
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          mb: 2,
          backgroundColor: 'white',
          '& .MuiFilledInput-root': {
            backgroundColor: 'white',
            ':hover': {
              backgroundColor: 'white',
            },
            $focused: {
              backgroundColor: 'white',
            },
          },
        }}
      />

      <Milestones milestones={klad.milestones} refetch={refetch} />
    </Box>
  );
}

export default About;
