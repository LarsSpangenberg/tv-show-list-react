import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  logoBg: {
    backgroundColor: theme.palette.secondary.light,
    height: theme.dimensions.headerHeight,
    width: theme.dimensions.sidebarWidth,
  },
}));
