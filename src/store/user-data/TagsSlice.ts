import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = [];

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    createTag(state, action: PayloadAction<string>) {
      if (action.payload && !state.includes(action.payload)) {
        state.push(action.payload);
      }
    },
    removeTag(state, action: PayloadAction<string>) {
      return state.filter((tag) => tag !== action.payload);
    },
  },
});

export const { createTag, removeTag } = tagsSlice.actions;

export default tagsSlice.reducer;
