import { FC } from 'react';
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

interface ShowsListToolbarProps {
  numSelected: number;
  isSidebarOpen: boolean;
  handleDelete: () => void;
  handleFilterClick: () => void;
}

// TODO: add clear filters option
const ShowsListToolbar: FC<ShowsListToolbarProps> = ({
  numSelected,
  isSidebarOpen,
  handleDelete,
  handleFilterClick,
}) => {
  const classes = useStyles();

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

      {/* 
        FIXME: Material-UI: You are providing a disabled `button` child to the Tooltip component.
        A disabled element does not fire events.
        Tooltip needs to listen to the child element's events to display the title.

        Add a simple wrapper element, such as a `span`. 
      */}
      <Tooltip title='Filters'>
        <IconButton onClick={handleFilterClick} disabled={isSidebarOpen}>
          <FilterIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

export default ShowsListToolbar;