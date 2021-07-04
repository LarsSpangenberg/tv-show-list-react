import React from 'react';

import { Toolbar, Typography, Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from './ShowsListToolbarStyles';

export default function ShowsTable(props) {
  const classes = useStyles();

  return (
    <Toolbar className={classes.toolbar}>
      <Typography>All Shows</Typography>

      <Tooltip title='Delete'>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}
