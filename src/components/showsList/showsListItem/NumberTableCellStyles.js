import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    '&:hover button': {
      opacity: 1,
    },
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    opacity: 0,
    transition: 'opacity .3s ease-in-out',
  },
}));
