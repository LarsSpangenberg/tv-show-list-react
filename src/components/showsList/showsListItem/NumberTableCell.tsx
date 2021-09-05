import { FC, MouseEventHandler } from 'react';
import { TableCell, Box, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { Show } from 'store/userData/ShowDetailsSlice';

import useStyles from './NumberTableCellStyles';

interface NumberTableCellProps {
  name: string;
  onClick: MouseEventHandler<HTMLElement>;
  handleIncDec: (name: keyof Show, isIncrementing: boolean) => void;
}

const NumberTableCell: FC<NumberTableCellProps> = ({
  name,
  handleIncDec,
  children,
  ...attributes
}) => {
  const classes = useStyles();

  function handleIncDecClick(
    isIncrementing: boolean,
    e: React.MouseEvent<HTMLElement>
  ) {
    e.stopPropagation();
    handleIncDec(name as keyof Show, isIncrementing);
  }

  return (
    <TableCell className={classes.root} align='center' {...attributes}>
      <Box
        width={100}
        display='inline-flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <IconButton
          className={classes.button}
          onClick={handleIncDecClick.bind(this, false)}
          size='small'
        >
          <RemoveIcon fontSize='small' />
        </IconButton>

        {children}

        <IconButton
          className={classes.button}
          onClick={handleIncDecClick.bind(this, true)}
          size='small'
        >
          <AddIcon fontSize='small' />
        </IconButton>
      </Box>
    </TableCell>
  );
};

export default NumberTableCell;
