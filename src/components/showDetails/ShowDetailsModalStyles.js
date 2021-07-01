import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  content: {
    overflowY: 'hidden',
  },
  deleteButton: {
    color: theme.palette.error.main
  },
}));
