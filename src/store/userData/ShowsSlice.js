import { createSlice } from '@reduxjs/toolkit';
import { getEqualValue as getEqualStatusValue } from 'constants/statusValues';


export const showsSlice = createSlice({
  name: 'shows',
  initialState: [],
  reducers: {
    addShow(state, action) {
      state.push(normalizeShowData(action.payload));
    },
    updateShow(state, action) {
      const i = state.findIndex((show) => show.id === action.payload.id);
      if (i !== -1) state[i] = action.payload;
    },
    updateSeasonOrEpisode(state, action) {
      const { id, field, isIncrementing } = action.payload;
      const i = state.findIndex((show) => show.id === id);
      
      if (isIncrementing) state[i][field]++;
      else state[i][field]--;
    },
    deleteShow(state, action) {
      return state.filter((show) => show.id !== action.payload);
    },
    deleteShows(state, action) {
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
function normalizeShowData(show) {
  const { tags, status } =  show;
  const normalizedTags = tags || [];
  const normalizedStatus = getEqualStatusValue(status);
  return {...show, tags: normalizedTags, status: normalizedStatus}
}

// Selectors
export const showsState = (state) => state.shows;
