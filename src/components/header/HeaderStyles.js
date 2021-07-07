import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => {
  const { headerHeight, sidebarWidth } = theme.dimensions;

  return {
    toolbar: {
      paddingLeft: 0,
      height: headerHeight,
    },
    brandingContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      padding: 20,
      height: headerHeight,
      width: sidebarWidth,
    },
    titleContainer: {
      marginLeft: sidebarWidth,
    },
    subtitle: {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(4),
    },
  };
});
