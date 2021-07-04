import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  root: {
    marginTop: '50vh',
    transform: 'translate(0, -50%)',
  },
  fab: {
    position: 'absolute',
    right: '5%',
    bottom: '5vh',
  },
}));