import { FC, ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import {
  ClickAwayListener,
  Drawer,
  Box,
  TextField,
  MenuItem,
  Button,
  useTheme,
} from '@mui/material';

import TagFilters from './TagFilters';

import { useAddTagMutation, useGetAllTagsQuery } from 'store/api';
import * as filterActions from 'store/app-data/FiltersSlice';
import * as uiActions from 'store/app-data/UiSlice';

import Status, { getEqualStatusValue } from 'store/models/ShowStatus';
import { Tag } from 'store/models/Tag';

const inputSpacing = { pl: 1 };

const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const {
    dimensions: { headerHeight, sidebarWidth },
  } = useTheme();

  const { data: tags, isSuccess: getTagsSuccess } = useGetAllTagsQuery();
  const [createNewTag, { isSuccess: newTagIsSuccess, data: newTagData }] =
    useAddTagMutation();

  const isSidebarOpen = useAppSelector((state) => state.ui.isSidebarOpen);
  const activeStatusFilter = useAppSelector((state) => state.filters.status);
  const isAnyFilterActive = useAppSelector((state) =>
    filterActions.getIsAnyFilterActive(state)
  );

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

  useEffect(() => {
    if(newTagIsSuccess && newTagData) {
      addTagFilter((newTagData as Tag).id)
    }
  }, [newTagIsSuccess, newTagData]);

  return (
    <ClickAwayListener
      onClickAway={closeSidebar}
      mouseEvent='onMouseUp'
      touchEvent='onTouchEnd'
    >
      <Drawer
        open={isSidebarOpen}
        variant='persistent'
        anchor='left'
        sx={{
          '& .MuiDrawer-paper': {
            maxWidth: sidebarWidth,
            overflow: 'visible',
          },
        }}
      >
        <Box
          sx={{
            bgcolor: 'secondary.light',
            minHeight: headerHeight,
            minWidth: sidebarWidth,
          }}
        />

        <Box height={0} display='flex' flexDirection='column' flex='1' pt={2}>
          <TextField
            select
            label='Filter by Status'
            value={activeStatusFilter}
            onChange={setStatusFilter}
            InputLabelProps={{ sx: inputSpacing }}
            inputProps={{ sx: inputSpacing }}
            variant='standard'
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
            tags={getTagsSuccess ? tags : []}
            createNewTag={createNewTag}
            addTagFilter={addTagFilter}
            removeTagFilter={removeTagFilter}
            inputSpacing={inputSpacing}
            isSidebarOpen={isSidebarOpen}
            setIgnoreSidebarClose={setIgnoreSidebarClose}
          />

          {isAnyFilterActive && (
            <Button
              onClick={resetFilters}
              size='small'
              fullWidth
              sx={({ palette: { grey } }) => ({
                color: grey[500],
                borderTop: '2px solid',
                borderColor: grey[300],
                borderRadius: 0,
                pt: 1,
                pb: 1,
              })}
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
