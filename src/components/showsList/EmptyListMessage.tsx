import { FC } from 'react';
import { Box, Typography } from '@mui/material';

interface EmptyListMessageProps {
  isAnyFilterActive: boolean;
  handleClick: () => void;
}

const EmptyListMessage: FC<EmptyListMessageProps> = ({
  isAnyFilterActive,
  handleClick,
}) => {

  return (
    <Box
      onClick={handleClick}
      display='flex'
      justifyContent='center'
      pt={4}
      px={8}
      pb={6}
      sx={{ cursor: 'pointer' }}
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
            clicking here or by clicking the (+) button on the bottom right corner of your
            screen.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default EmptyListMessage;
