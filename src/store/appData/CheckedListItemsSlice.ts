import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { showsState } from 'store/userData/ShowsSlice';

interface CheckedListItemsState {
  checked: boolean[];
  numChecked: number;
}

const initialState: CheckedListItemsState = {
  checked: [],
  numChecked: 0,
};

// DTOs
export interface CheckedItem {
  i: number;
  isChecked: boolean;
}

// Reducer
export const checkedListItemsSlice = createSlice({
  name: 'checkedListItems',
  initialState,
  reducers: {
    toggleCheck(
      state,
      action: PayloadAction<CheckedItem>
    ) {
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
    toggleCheckAll(state, action: PayloadAction<number>) {
      const rowCount = action.payload;

      if (state.numChecked < rowCount) {
        const checked: boolean[] = [];

        for (let i = 0; i < rowCount; i++) {
          checked[i] = true;
        }

        return {
          checked,
          numChecked: checked.length,
        };
      } else if (rowCount > 0 && state.numChecked === rowCount) {
        return initialState;
      }
    },
    resetChecked() {
      return initialState;
    },
  },
});

export const { toggleCheck, toggleCheckAll, resetChecked } =
  checkedListItemsSlice.actions;

export default checkedListItemsSlice.reducer;

// Selectors
const checkedListItems = (state: RootState) => state.checkedListItems.checked;

export const getCheckedItemIds = createSelector(
  [showsState, checkedListItems],
  (shows, checkedItems) => {
    const checkedIds: string[] = [];
    checkedItems.forEach((isSelected, i) => {
      if (isSelected) checkedIds.push(shows[i].id);
    });

    return checkedIds;
  }
);

