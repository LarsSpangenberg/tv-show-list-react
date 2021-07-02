import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  root: {
    marginTop: '50vh',
    transform: 'translate(0, -50%)',
  },
  toolbar: {
    backgroundColor: theme.palette.primary.main,
    justifyContent: 'space-between',
  },
  headerRow: {
    backgroundColor: theme.palette.primary.dark,
    '& th': {
      color: theme.palette.common.white,
    }
  },
  listItem: {
    '&:hover': {
      cursor: 'pointer'
    },
  },
  fab: {
    position: 'absolute',
    right: '5%',
    bottom: '5vh',
  },
}));