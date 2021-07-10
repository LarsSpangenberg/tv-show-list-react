import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => {
  const { duration, easing, create } = theme.transitions;

  return {
    root: {
      marginTop: 50,
      transition: create('padding', {
        duration: duration.short,
        easing: easing.easeOut,
      }),
    },
    root_sidebarOpen: {
      paddingLeft: theme.dimensions.sidebarWidth + theme.spacing(3),
    },
    fab: {
      position: 'absolute',
      right: '2%',
      bottom: '5vh',
    },
  };
});
