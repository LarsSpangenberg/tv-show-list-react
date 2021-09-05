import { lighten, makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  contentTop: {
    backgroundColor: lighten(theme.palette.secondary.light, 0.4),
    paddingBottom: theme.spacing(2),
    overflowY: 'hidden',
  },
  contentBottom: {
    height: 225,
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));
