import { createSelector, createSlice } from '@reduxjs/toolkit';
import { showsState } from 'store/userData/ShowsSlice';

const defaultState = {
  checked: [],
  numChecked: 0,
};

export const checkedListItemsSlice = createSlice({
  name: 'checkedListItems',
  initialState: defaultState,
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
        return defaultState;
      }
    },
    resetChecked() {
      return defaultState;
    },
  },
});

export const { toggleCheck, toggleCheckAll, resetChecked } =
  checkedListItemsSlice.actions;

export default checkedListItemsSlice.reducer;

// Selectors
const checkedListItems = (state) => state.checkedListItems.checked;

 export const getCheckedItemIds = createSelector(
  [showsState, checkedListItems],
  (shows, checkedItems) => {
    const checkedIds = [];
    checkedItems.forEach((isSelected, i) => {
      if (isSelected) checkedIds.push(shows[i].id);
    });

    return checkedIds;
  }
);
