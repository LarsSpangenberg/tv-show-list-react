import { createSlice } from '@reduxjs/toolkit';

export const showsSlice = createSlice({
  name: 'shows',
  initialState: [],
  reducers: {
    addShow(state, action) {
      state.push(action.payload);
    },
    removeShow(state, action) {
      const i = state.findIndex(show => show.id !== action.payload);
      state.splice(i, 1);
    },
  },
});

export const { addShow, removeShow } = showsSlice.actions;

export default showsSlice.reducer;