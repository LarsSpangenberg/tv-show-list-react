import { createSlice } from '@reduxjs/toolkit';

export const showsSlice = createSlice({
  name: 'shows',
  initialState: [],
  reducers: {
    addShow(state, action) {
      state.push(action.payload);
    },
    updateShow(state, action) {
      const i = state.findIndex((show) => show.id === action.payload.id);
      if (i !== -1) state[i] = action.payload;
    },
    deleteShow(state, action) {
      return state.filter((show) => show.id !== action.payload);
    },
    deleteShows(state, action) {
      return state.filter((show) => !action.payload.includes(show.id));
    },
    updateSeasonOrEpisode(state, action) {
      const { id, field, isIncrementing } = action.payload;
      const i = state.findIndex((show) => show.id === id);

      if (isIncrementing) state[i][field]++;
      else state[i][field]--;
    },
  },
});

export const { addShow, updateShow, updateSeasonOrEpisode, deleteShow, deleteShows } =
  showsSlice.actions;

export default showsSlice.reducer;
