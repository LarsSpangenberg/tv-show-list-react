import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  sidebar: {
    maxWidth: theme.dimensions.sidebarWidth,
  },
  logoBg: {
    backgroundColor: theme.palette.secondary.light,
    height: theme.dimensions.headerHeight,
    width: theme.dimensions.sidebarWidth,
  },
  statusTextfield: {
    // marginTop: theme.spacing(1),
  },
  inputSpacing: {
    paddingLeft: theme.spacing(1),
  },
}));
