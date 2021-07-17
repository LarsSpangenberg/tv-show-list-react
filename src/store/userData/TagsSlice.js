import { createSlice } from '@reduxjs/toolkit';

export const tagsSlice = createSlice({
  name: 'tags',
  initialState: [],
  reducers: {
    createTag(state, action) {
      if (action.payload && !state.includes(action.payload)) {
        state.push(action.payload);
      }
    },
    removeTag(state, action) {
      return state.filter((tag) => tag !== action.payload);
    },
  },
});

export const { createTag, removeTag } = tagsSlice.actions;

export default tagsSlice.reducer;
