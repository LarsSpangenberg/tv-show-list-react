import { Box, Typography } from '@material-ui/core';

import useStyles from './EmptyListMessageStyles';

export default function EmptyListMessage(props) {
  const classes = useStyles();
  const { isAnyFilterActive, handleClick } = props;

  return (
    <Box
      className={classes.root}
      onClick={handleClick}
      display='flex'
      justifyContent='center'
      pt={4}
      px={8}
      pb={6}
    >
      <Box maxWidth={700} textAlign='center'>
        {isAnyFilterActive ? (
          <Typography component='p' variant='h6'>
            There are no shows that match your selected filters. Please adjust
            your filters for better results. You can also add a new show with
            the currently selected filters by clicking here or the (+) button on
            the bottom right corner of your screen.
          </Typography>
        ) : (
          <Typography component='p' variant='h6'>
            You haven't made any entries in your list. You can add a new show by
            clicking here or the (+) button on the bottom right corner of your
            screen.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
