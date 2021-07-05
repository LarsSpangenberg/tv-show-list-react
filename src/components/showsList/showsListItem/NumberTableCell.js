import React from 'react';
import { TableCell, Box, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import useStyles from './NumberTableCellStyles';

export default function NumberTableCell(props) {
  const classes = useStyles();

  const { name, handleIncDec, ...attr } = props;

  function handleIncDecClick(isIncrementing, e) {
    e.stopPropagation();    
    handleIncDec(name, isIncrementing);
  }

  return (
    <TableCell name={name} className={classes.root} align='center' {...attr}>
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

        {props.children}

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
