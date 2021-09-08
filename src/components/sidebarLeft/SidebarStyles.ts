import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => {
  const { sidebarWidth, headerHeight } = theme.dimensions;
  return {
    sidebar: {
      maxWidth: sidebarWidth,
      overflow: 'visible'
    },
    logoBg: {
      backgroundColor: theme.palette.secondary.light,
      height: headerHeight,
      width: sidebarWidth,
    },
    inputSpacing: {
      paddingLeft: theme.spacing(1),
    },
    clearButton: {
      color: theme.palette.grey[400],
      // textTransform: 'none',
    }
  };
});
