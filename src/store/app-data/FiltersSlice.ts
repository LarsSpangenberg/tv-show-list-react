import { RootState } from '../store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Status from 'constants/ShowStatus';

import { showsState } from 'store/user-data/ShowsSlice';

interface FiltersState {
  status: Status;
  tags: string[];
}

const initialState: FiltersState = {
  status: Status.NO_VALUE,
  tags: [],
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatusFilter(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    addTagFilter(state, action: PayloadAction<string>) {
      state.tags.push(action.payload);
    },
    removeTagFilter(state, action: PayloadAction<string>) {
      if (state.tags) {
        return {
          ...state,
          tags: state.tags.filter((tag) => tag !== action.payload),
        };
      }
    },
    resetAllFilters() {
      return initialState;
    },
  },
});

export const {
  setStatusFilter,
  addTagFilter,
  removeTagFilter,
  resetAllFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;

// Selectors
const filterState = (state: RootState) => state.filters;

export const getFilteredShows = createSelector(
  [showsState, filterState],
  (shows, filters) => {
    const { status: statusFilter, tags: tagFilter } = filters;

    return shows.filter((show) => {
      let matchesStatusFilter = true;
      let matchesTagFilter = true;

      if (statusFilter) {
        matchesStatusFilter = statusFilter === show.status;
      }

      if (tagFilter.length > 0) {
        matchesTagFilter = show.tags.some((tag) => tagFilter.includes(tag));
      }

      return matchesStatusFilter && matchesTagFilter;
    });
  }
);

export const getIsAnyFilterActive = createSelector(filterState, (filters) => {
  const isStatusActive = filters.status !== '';
  const isTagsActive = filters.tags.length > 0;
  return isStatusActive || isTagsActive;
});
