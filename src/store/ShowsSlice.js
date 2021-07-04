import { createSlice } from '@reduxjs/toolkit';

export const showsSlice = createSlice({
  name: 'shows',
  initialState: [],
  reducers: {
    addShow(state, action) {
      state.push(action.payload);
    },
    updateShow(state, action) {
      const i = state.findIndex(show => show.id === action.payload.id);
      state[i] = action.payload;
    },
    deleteShow(state, action) {
      return state.filter(show => show.id !== action.payload);
    },
    deleteShows(state, action) {
      return state.filter(show => !action.payload.includes(show.id));
    },
  },
});

export const { addShow, updateShow, deleteShow, deleteShows } = showsSlice.actions;

export default showsSlice.reducer;