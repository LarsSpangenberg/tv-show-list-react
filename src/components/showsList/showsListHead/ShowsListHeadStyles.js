import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  headerRow: {
    backgroundColor: theme.palette.primary.dark,
    '& th': {
      color: theme.palette.common.white,
    },
  },
}));
