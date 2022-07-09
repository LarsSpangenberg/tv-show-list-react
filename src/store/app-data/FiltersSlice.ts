import { selectAllTags } from './../api';
import { RootState } from '../store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Status from 'store/models/ShowStatus';
import { Tag } from 'store/models/Tag';

interface FiltersState {
  status: Status;
  selectedTagIds: string[];
}

const initialState: FiltersState = {
  status: Status.NO_VALUE,
  selectedTagIds: [],
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatusFilter(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    addTagFilter(state, action: PayloadAction<string>) {
      if (!state.selectedTagIds.includes(action.payload)) {
        state.selectedTagIds.push(action.payload);
      }
    },
    removeTagFilter(state, action: PayloadAction<string>) {
      if (state.selectedTagIds.length > 0) {
        state.selectedTagIds = state.selectedTagIds.filter(
          (id) => id !== action.payload
        );
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
export const filterState = (state: RootState) => state.filters;

interface TagFiltersDTO {
  active: Tag[];
  inactive: Tag[];
}

export const getTagFilters = createSelector(
  filterState,
  selectAllTags,
  (state, tags): TagFiltersDTO => {
    const selectedTagIds = [...state.selectedTagIds];
    const tagFilters = {
      active: [],
      inactive: [],
    } as TagFiltersDTO;

    if (!tags || !Array.isArray(tags) || tags.length === 0) return tagFilters;
    if (selectedTagIds.length === 0) return { ...tagFilters, inactive: tags };

    tagFilters.inactive = [...tags];
    tagFilters.active = selectedTagIds.map((id) => {
      const tagIndex = tagFilters.inactive.findIndex((tag) => id === tag.id);

      if (tagIndex > -1) {
        return tagFilters.inactive.splice(tagIndex, 1)[0];
      }
    }) as Tag[];

    return tagFilters;
  }
);

export const getIsAnyFilterActive = createSelector(filterState, (filters) => {
  const isStatusActive = filters.status !== '';
  const isTagsActive = filters.selectedTagIds.length > 0;
  return isStatusActive || isTagsActive;
});
