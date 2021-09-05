import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: theme.spacing(1),
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey['A100'],
    },
    ul: {
      listStyleType: 'none',
      paddingInlineStart: 0,
    },
  },
}));
