import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  tagsTextfield: {
    marginTop: theme.spacing(2),
  },
  inputSpacing: {
    paddingLeft: theme.spacing(1),
  },
  filterChip: {
    marginTop: theme.spacing(1),
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
