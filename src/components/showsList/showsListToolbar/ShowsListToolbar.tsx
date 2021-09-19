import { FC, MouseEvent } from 'react';
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
import ResetFiltersIcon from '@material-ui/icons/ClearAll';

import useStyles from './ShowsListToolbarStyles';

interface ShowsListToolbarProps {
  numSelected: number;
  isSidebarOpen: boolean;
  isAnyFilterActive: boolean;
  handleDelete: () => void;
  handleFilterClick: () => void;
  resetFilters: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ShowsListToolbar: FC<ShowsListToolbarProps> = ({
  numSelected,
  isSidebarOpen,
  isAnyFilterActive,
  handleDelete,
  handleFilterClick,
  resetFilters,
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

      {isAnyFilterActive && (
        <Tooltip title='Reset Filters'>
          <IconButton onClick={resetFilters} name='reset-filters'>
            <ResetFiltersIcon />
          </IconButton>
        </Tooltip>
      )}
      
      {!isSidebarOpen && (
        <Tooltip title='Filter Menu'>
          <IconButton onClick={handleFilterClick}>
            <FilterIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default ShowsListToolbar;
