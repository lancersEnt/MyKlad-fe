import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)(({ theme }) => ({
  border: 'none',
  overflow: 'hidden',
  borderRadius: 10,
  transition: theme.transitions.create(['border-color', 'box-shadow']),
  ':hover': {
    backgroundColor: '#fff',
  },
  '& legend': { display: 'none' },
  '& fieldset': { top: 0 },
  $focused: {
    backgroundColor: '#fff',
    boxShadow: `fade${(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    borderColor: theme.palette.primary.main,
  },
})) as typeof TextField;

export default CustomTextField;
