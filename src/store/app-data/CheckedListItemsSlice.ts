import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Show } from 'store/user-data/ShowDetailsSlice';

interface CheckedListItemsState {
  checked: boolean[];
  checkedIds: string[];
  numChecked: number;
}

const initialState: CheckedListItemsState = {
  checked: [],
  checkedIds: [],
  numChecked: 0,
};

// DTOs
export interface CheckedItem {
  i: number;
  id: string;
  isChecked: boolean;
}

// Reducer
export const checkedListItemsSlice = createSlice({
  name: 'checkedListItems',
  initialState,
  reducers: {
    toggleCheck(state, action: PayloadAction<CheckedItem>) {
      const { i, id, isChecked } = action.payload;
      const checked = state.checked ? [...state.checked] : [];
      const numChecked = isChecked
        ? state.numChecked + 1
        : state.numChecked - 1;
      checked[i] = isChecked;

      const checkedIds = [...state.checkedIds];
      const idIndex = state.checkedIds.indexOf(id);
      if (idIndex === -1) {
        checkedIds.push(id);
      } else {
        checkedIds.splice(i, 1);
      }

      return {
        checked,
        checkedIds,
        numChecked,
      };
    },
    toggleCheckAll(state, action: PayloadAction<Show[]>) {
      const shows = action.payload;

      if (state.numChecked < shows.length) {
        const checked: boolean[] = [];
        const checkedIds = [...state.checkedIds];

        shows.forEach((show, i) => {
          if (!checkedIds.includes(show.id)) {
            checkedIds.push(show.id);
          }
          checked[i] = true;
        });

        return {
          checked,
          checkedIds,
          numChecked: checked.length,
        };
      } else if (shows.length > 0 && state.numChecked === shows.length) {
        return initialState;
      }
    },
    resetChecked() {
      return initialState;
    },
    reevaluateChecked(state, action: PayloadAction<Show[]>) {
      const displayedShows = action.payload;
      const checked: boolean[] = [];
      const newCheckedIds: string[] = [];
      let numChecked = 0;

      displayedShows.forEach((show) => {
        if (state.checkedIds.includes(show.id)) {
          checked.push(true);
          newCheckedIds.push(show.id);
          numChecked++;
        } else {
          checked.push(false);
        }
      });
      return { checked, numChecked, checkedIds: newCheckedIds };
    },
  },
});

export const { toggleCheck, toggleCheckAll, resetChecked, reevaluateChecked } =
  checkedListItemsSlice.actions;

export default checkedListItemsSlice.reducer;
