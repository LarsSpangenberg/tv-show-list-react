import React from 'react';

import { Toolbar, Typography, Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

import useStyles from './ShowsListToolbarStyles';

export default function ShowsTable(props) {
  const classes = useStyles();
  const { numSelected, handleDelete } = props;

  return (
    <Toolbar className={classes.toolbar}>
      <Typography variant='h6'>All Shows</Typography>

      {numSelected > 0 && (
        <Tooltip title='Delete'>
          <IconButton onClick={handleDelete}>
            {numSelected === 1 ? <DeleteIcon /> : <DeleteSweepIcon />}
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
