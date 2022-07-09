import { FC, MouseEvent } from 'react';
import { Toolbar, Box, Typography, Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import FilterIcon from '@mui/icons-material/FilterList';
import ResetFiltersIcon from '@mui/icons-material/ClearAll';

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
  return (
    <Toolbar sx={{ bgcolor: 'primary.main' }}>
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
