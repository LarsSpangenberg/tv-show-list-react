import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Status from 'constants/ShowStatus';
import randomId from 'util/randomId';

interface ShowDetailsState {
  show: Show;
  isNew: boolean;
  focusField: string;
}

const initialState: ShowDetailsState = {
  show: createShow(),
  isNew: true,
  focusField: 'title',
};

// DTOs
export interface Show {
  id: string;
  title: string;
  status: Status;
  season: number;
  episode: number;
  note: string;
  tags: string[];
}

export interface ShowAndFocusfield {
  show: Show;
  focusField: string;
}

export interface DetailsUpdateDto {
  key: string;
  value: DetailsFormInputValue;
}

export type DetailsFormInputValue = string | number | string[] | Status;


// Reducer
export const showDetailsSlice = createSlice({
  name: 'showDetails',
  initialState,
  reducers: {
    createNewShow(_, action: PayloadAction<string[]>) {
      const tags = action.payload ? [...action.payload] : [];
      return {
        ...initialState,
        show: createShow(tags),
      };
    },
    selectShow(_, action: PayloadAction<ShowAndFocusfield>) {
      return {
        ...action.payload,
        isNew: false,
      };
    },
    updateSelection(state, action: PayloadAction<DetailsUpdateDto>) {
      const { key, value } = action.payload;
      return {
        ...state,
        show: { ...state.show, [key]: value },
      };
    },
    resetSelection() {
      return initialState;
    },
  },
});

// util
function createShow(tags?: string[]): Show {
  return {
    id: randomId(),
    title: '',
    season: 1,
    episode: 1,
    status: Status.CURRENT,
    note: '',
    tags: tags || [],
  };
}

export const { createNewShow, selectShow, updateSelection, resetSelection } =
  showDetailsSlice.actions;

export default showDetailsSlice.reducer;
