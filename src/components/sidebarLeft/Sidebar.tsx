import { FC, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  ClickAwayListener,
  Drawer,
  Box,
  TextField,
  MenuItem,
} from '@material-ui/core';

import useStyles from './SidebarStyles';
import TagFilters from './tagFilters/TagFilters';
import Status, { getEqualStatusValue } from 'constants/showStatus';

import { RootState } from 'store/store';
import { createTag } from 'store/userData/TagsSlice';
import * as filterActions from 'store/appData/FiltersSlice';
import * as uiActions from 'store/appData/UiSlice';

// import * as status from 'data/constants/statusValues';

const Sidebar: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const tags = useSelector((state: RootState) => state.tags);

  const activeStatusFilter = useSelector(
    (state: RootState) => state.filters.status
  );
  
  const activeTagFilters = useSelector(
    (state: RootState) => state.filters.tags
  );
  
  const isSidebarOpen = useSelector(
    (state: RootState) => state.ui.isSidebarOpen
  );

  const closeSidebar = () => dispatch(uiActions.closeSidebar());
  const createNewTag = (tag: string) => dispatch(createTag(tag));
  
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

        <Box pt={2}>
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
        </Box>
      </Drawer>
    </ClickAwayListener>
  );
};

export default Sidebar;
