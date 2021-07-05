import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    '&:hover button': {
      opacity: 1,
    },
  },
  button: {
    opacity: 0,
    transition: 'opacity .3s ease-in-out',
  },
}));
