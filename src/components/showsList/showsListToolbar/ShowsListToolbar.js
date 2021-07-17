import React from 'react';

import {
  Toolbar,
  Box,
  Typography,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import FilterIcon from '@material-ui/icons/FilterList';

import useStyles from './ShowsListToolbarStyles';

export default function ShowsTable(props) {
  const classes = useStyles();
  const { numSelected, isSidebarOpen, handleDelete, handleFilterClick } = props;

  return (
    <Toolbar className={classes.toolbar}>
      <Box flexGrow={1}>
        <Typography variant='h6'>All Shows</Typography>
      </Box>

      {numSelected > 0 && (
        <Tooltip title='Delete'>
          <IconButton onClick={handleDelete}>
            {numSelected === 1 ? <DeleteIcon /> : <DeleteSweepIcon />}
          </IconButton>
        </Tooltip>
      )}

      <Tooltip title='Filters'>
        <IconButton onClick={handleFilterClick} disabled={isSidebarOpen}>
          <FilterIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}
