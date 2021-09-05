import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

import { Show } from './ShowDetailsSlice';
import { getEqualStatusValue } from 'constants/showStatus';

const initialState: Show[] = [];

export interface IncDecDto {
  id: string;
  field: keyof Show;
  isIncrementing: boolean;
}

export const showsSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {
    addShow(state, action: PayloadAction<Show>) {
      state.push(normalizeShowData(action.payload));
    },
    updateShow(state, action: PayloadAction<Show>) {
      const i = state.findIndex((show) => show.id === action.payload.id);
      if (i !== -1) state[i] = action.payload;
    },
    updateSeasonOrEpisode(state, action: PayloadAction<IncDecDto>) {
      const { id, field, isIncrementing } = action.payload;
      const i = state.findIndex((show) => show.id === id);
      const show = state[i];

      if (isIncrementing) {
        show[field]++;
      } else if (show[field] > 1) {
        show[field]--;
      }
    },
    deleteShow(state, action: PayloadAction<string>) {
      return state.filter((show) => show.id !== action.payload);
    },
    deleteShows(state, action: PayloadAction<string[]>) {
      return state.filter((show) => !action.payload.includes(show.id));
    },
  },
});

export const {
  addShow,
  updateShow,
  updateSeasonOrEpisode,
  deleteShow,
  deleteShows,
} = showsSlice.actions;

export default showsSlice.reducer;

// util
function normalizeShowData(show: Show) {
  const { status } = show;
  const normalizedStatus = getEqualStatusValue(status);
  return { ...show, status: normalizedStatus };
}

// Selectors
export const showsState = (state: RootState): Show[] => state.shows;
