import React from 'react';

import { TableHead, TableRow, TableCell, Checkbox } from '@material-ui/core';

import useStyles from './ShowsListHeadStyles';

export default function ShowsListHead(props) {
  const classes = useStyles();

  const { numSelected, rowsCount, handleSelectAll } = props;

  function isAllSelected() {
    return rowsCount > 0 && numSelected === rowsCount;
  }

  function isAnySelected() {
    return numSelected > 0 && numSelected < rowsCount;
  }

  return (
    <TableHead>
      <TableRow className={classes.headerRow}>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={isAnySelected()}
            checked={isAllSelected()}
            onClick={handleSelectAll}
          />
        </TableCell>
        <TableCell>Title</TableCell>
        <TableCell>Season</TableCell>
        <TableCell>Episode</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Tags</TableCell>
        <TableCell>Note</TableCell>
      </TableRow>
    </TableHead>
  );
}
