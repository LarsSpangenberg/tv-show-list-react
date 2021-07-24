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

import { createTag } from 'store/userData/TagsSlice';
import * as filterActions from 'store/appData/FiltersSlice';
import * as uiActions from 'store/appData/UiSlice';
import * as status from 'constants/statusValues';

export default function Sidebar() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const tags = useSelector((state) => state.tags);
  const activeStatusFilter = useSelector((state) => state.filters.status);
  const activeTagFilters = useSelector((state) => state.filters.tags);
  const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);

  const closeSidebar = () => dispatch(uiActions.closeSidebar());
  const setIgnoreSidebarClose = (isIgnored) => dispatch(uiActions.setIgnoreSidebarClose(isIgnored))
  const createNewTag = (tag) => dispatch(createTag(tag));
  const addTagFilter = (tag) => dispatch(filterActions.addTagFilter(tag));
  const removeTagFilter = (tag) => dispatch(filterActions.removeTagFilter(tag));
  const setStatusFilter = (event) =>
    dispatch(filterActions.setStatusFilter(event.target.value));


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
            className={classes.statusTextfield}
            label='Filter by Status'
            value={activeStatusFilter}
            onChange={setStatusFilter}
            InputLabelProps={{ className: classes.inputSpacing }}
            inputProps={{ className: classes.inputSpacing }}
            fullWidth
          >
            <MenuItem value=''>No Filter</MenuItem>
            <MenuItem value={status.CURRENT}>Current</MenuItem>
            <MenuItem value={status.COMPLETED}>Completed</MenuItem>
            <MenuItem value={status.PLAN_TO_WATCH}>Watch Later</MenuItem>
            <MenuItem value={status.ON_HOLD}>On Hold</MenuItem>
            <MenuItem value={status.DROPPED}>Dropped</MenuItem>
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
}
