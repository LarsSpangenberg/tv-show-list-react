import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
  },
  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  deleteButton: {
    color: theme.palette.error.main
  },
}));
