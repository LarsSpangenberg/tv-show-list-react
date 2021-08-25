import { createSlice } from '@reduxjs/toolkit';
import { CURRENT } from 'constants/statusValues';

const defaultState = {
  title: '',
  season: 1,
  episode: 1,
  status: CURRENT,
  note: '',
  isNew: true,
  focusField: 'title',
};

function randomID() {
  return Math.floor(Math.random() * 100).toString();
}

export const showDetailsSlice = createSlice({
  name: 'showDetails',
  initialState: defaultState,
  reducers: {
    createNewShow(_, action) {
      const tags = action.payload ? [...action.payload] : [];
      return {
        ...defaultState,
        id: randomID(),
        tags,
        isNew: true,
        focusField: 'title',
      };
    },
    selectShow(_, action) {
      return {
        ...defaultState,
        ...action.payload,
        isNew: false,
      };
    },
    updateSelection(state, action) {
      Object.assign(state, action.payload);
    },
    resetSelection() {
      return defaultState;
    },
  },
});

export const { createNewShow, selectShow, updateSelection, resetSelection } =
  showDetailsSlice.actions;

export default showDetailsSlice.reducer;
