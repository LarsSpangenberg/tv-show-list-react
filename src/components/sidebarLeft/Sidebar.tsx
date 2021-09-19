import { FC, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import {
  ClickAwayListener,
  Drawer,
  Box,
  TextField,
  MenuItem,
  Button,
} from '@material-ui/core';

import useStyles from './SidebarStyles';
import TagFilters from './tagFilters/TagFilters';
import Status, { getEqualStatusValue } from 'constants/ShowStatus';

import { createTag } from 'store/user-data/TagsSlice';
import * as filterActions from 'store/app-data/FiltersSlice';
import * as uiActions from 'store/app-data/UiSlice';

const Sidebar: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const tags = useAppSelector((state) => state.tags);
  const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen);
  const activeStatusFilter = useAppSelector((state) => state.filters.status);
  const activeTagFilters = useAppSelector((state) => state.filters.tags);
  const isAnyFilterActive = useAppSelector((state) =>
    filterActions.getIsAnyFilterActive(state)
  );

  const createNewTag = (tag: string) => dispatch(createTag(tag));
  const resetFilters = () => dispatch(filterActions.resetAllFilters());

  function closeSidebar() {
    dispatch(uiActions.setSidebarClose());
  }

  function setIgnoreSidebarClose(isIgnored: boolean) {
    dispatch(uiActions.setIgnoreSidebarClose(isIgnored));
  }

  function addTagFilter(tag: string) {
    dispatch(filterActions.addTagFilter(tag));
  }

  function removeTagFilter(tag: string) {
    dispatch(filterActions.removeTagFilter(tag));
  }

  function setStatusFilter(event: ChangeEvent<HTMLInputElement>) {
    dispatch(
      filterActions.setStatusFilter(getEqualStatusValue(event.target.value))
    );
  }

  return (
    <ClickAwayListener
      onClickAway={closeSidebar}
      mouseEvent='onMouseUp'
      touchEvent='onTouchEnd'
    >
      <Drawer
        classes={{ paper: classes.sidebar }}
        open={isSidebarOpen}
        variant='persistent'
        anchor='left'
      >
        <div className={classes.logoBg} />

        <Box
          className={classes.sidebarContent}
          display='flex'
          flexDirection='column'
          flex='1'
          pt={2}
        >
          <TextField
            select
            label='Filter by Status'
            value={activeStatusFilter}
            onChange={setStatusFilter}
            InputLabelProps={{ className: classes.inputSpacing }}
            inputProps={{ className: classes.inputSpacing }}
            fullWidth
          >
            <MenuItem value={Status.NO_VALUE}>No Filter</MenuItem>
            <MenuItem value={Status.CURRENT}>Current</MenuItem>
            <MenuItem value={Status.COMPLETED}>Completed</MenuItem>
            <MenuItem value={Status.PLAN_TO_WATCH}>Watch Later</MenuItem>
            <MenuItem value={Status.ON_HOLD}>On Hold</MenuItem>
            <MenuItem value={Status.DROPPED}>Dropped</MenuItem>
          </TextField>

          <TagFilters
            tags={tags}
            activeTagFilters={activeTagFilters}
            createNewTag={createNewTag}
            addTagFilter={addTagFilter}
            removeTagFilter={removeTagFilter}
            inputSpacingClass={classes.inputSpacing}
            isSidebarOpen={isSidebarOpen}
            setIgnoreSidebarClose={setIgnoreSidebarClose}
          />

          {isAnyFilterActive && (
            <Button
              className={classes.clearButton}
              onClick={resetFilters}
              size='small'
              fullWidth
            >
              Reset All Filters
            </Button>
          )}
        </Box>
      </Drawer>
    </ClickAwayListener>
  );
};

export default Sidebar;
