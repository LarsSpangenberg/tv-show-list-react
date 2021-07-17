import { createSlice } from '@reduxjs/toolkit';

const defaultState = {
  title: '',
  season: 1,
  episode: 1,
  status: 'current',
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
    createNewShow() {
      return {
        ...defaultState,
        id: randomID(),
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
