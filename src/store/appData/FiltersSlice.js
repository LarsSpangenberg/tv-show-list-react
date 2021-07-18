import { createSelector, createSlice } from '@reduxjs/toolkit';
import { showsState } from 'store/userData/ShowsSlice';

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    status: '',
    tags: [],
  },
  reducers: {
    setStatusFilter(state, action) {
      state.status = action.payload;
    },
    addTagFilter(state, action) {
      console.log(filtersSlice);
      if (!state.tags || state.tags.length === 0) {
        state.tags = [action.payload];
      } else {
        state.tags.push(action.payload);
      }
    },
    removeTagFilter(state, action) {
      if (state.tags) {
        return {
          ...state,
          tags: state.tags.filter((tag) => tag !== action.payload),
        };
      }
    },
  },
});

export const { setStatusFilter, addTagFilter, removeTagFilter } =
  filtersSlice.actions;

export default filtersSlice.reducer;

// Selectors
const filterState = (state) => state.filters;

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
