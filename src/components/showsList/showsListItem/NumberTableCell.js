import { TableCell, Box, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import useStyles from './NumberTableCellStyles';

export default function NumberTableCell({
  name,
  handleIncDec,
  children,
  ...attributes
}) {
  const classes = useStyles();

  function handleIncDecClick(isIncrementing, e) {
    e.stopPropagation();
    handleIncDec(name, isIncrementing);
  }

  return (
    <TableCell name={name} className={classes.root} align='center' {...attributes}>
      <Box
        name={name}
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
}
