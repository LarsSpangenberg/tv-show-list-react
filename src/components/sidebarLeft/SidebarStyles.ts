import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => {
  const { sidebarWidth, headerHeight } = theme.dimensions;
  return {
    sidebar: {
      maxWidth: sidebarWidth,
      overflow: 'visible'
    },
    sidebarContent: {
      height: 0,
    },
    logoBg: {
      backgroundColor: theme.palette.secondary.light,
      minHeight: headerHeight,
      minWidth: sidebarWidth,
    },
    inputSpacing: {
      paddingLeft: theme.spacing(1),
    },
    clearButton: {
      color: theme.palette.grey[500],
      borderTop: '1px solid',
      borderColor: theme.palette.grey[300],
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      borderRadius: 0,
    }
  };
});
