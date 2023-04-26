import { Select, styled } from '@mui/material';

const CustomSelectField = styled(Select)(({ theme }) => ({
  border: 'none',
  overflow: 'hidden',
  borderRadius: 10,
  transition: theme.transitions.create(['border-color', 'box-shadow']),
  // '& legend': { display: 'none' },
  '& fieldset': { top: 5 },
  $focused: {
    backgroundColor: '#fff',
    boxShadow: `fade${(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    borderColor: theme.palette.primary.main,
  },
}));
export default CustomSelectField;
