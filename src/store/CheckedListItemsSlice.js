import { createSlice } from '@reduxjs/toolkit';

export const checkedListItemsSlice = createSlice({
  name: 'checkedListItems',
  initialState: {
    checked: [],
    numChecked: 0,
  },
  reducers: {
    toggleCheck(state, action) {
      const { i, isChecked } = action.payload;
      const checked = state.checked ? [...state.checked] : [];
      const numChecked = isChecked
        ? state.numChecked + 1
        : state.numChecked - 1;
      checked[i] = isChecked;

      return {
        checked,
        numChecked,
      };
    },
    toggleCheckAll(state, action) {
      const rowCount = action.payload;
      
      if (state.numChecked < rowCount) {
        const checked = [];
        for (let i = 0; i < rowCount; i++) {
          checked[i] = true;
        }

        return {
          checked,
          numChecked: checked.length,
        };
      } else if (rowCount > 0 && state.numChecked === rowCount) {
        return {
          checked: [],
          numChecked: 0,
        };
      }
    },
  },
});

export const { toggleCheck, toggleCheckAll } = checkedListItemsSlice.actions;

export default checkedListItemsSlice.reducer;
