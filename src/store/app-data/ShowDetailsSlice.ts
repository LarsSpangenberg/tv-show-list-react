import { selectAllTags } from './../api';
import { RootState } from './../store';
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import Status from 'store/models/ShowStatus';
import { Show } from 'store/models/Show';
import { Tag } from 'store/models/Tag';

type NewShowData = Omit<Show, 'id'>;
export type ShowDetailsData = Show | NewShowData;

interface ShowDetailsState {
  show: ShowDetailsData;
  isNew: boolean;
  focusField: string;
}

const initialState: ShowDetailsState = {
  show: createNewShowData(),
  isNew: true,
  focusField: 'title',
};

// DTOs
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
        show: createNewShowData(tags),
      };
    },
    selectShow(_, action: PayloadAction<ShowAndFocusfield>) {
      return {
        ...action.payload,
        isNew: !('id' in action.payload.show),
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
function createNewShowData(tags?: string[]): NewShowData {
  return {
    title: '',
    season: 1,
    episode: 1,
    status: Status.CURRENT,
    note: '',
    tags: tags ?? [],
  };
}

export const { createNewShow, selectShow, updateSelection, resetSelection } =
  showDetailsSlice.actions;

export default showDetailsSlice.reducer;

// Selectors
const selectShowTags = (state: RootState) => state.showDetails.show.tags;

interface TagOptionsDTO {
  showTags: Tag[];
  remainingTags: Tag[];
}

export const getTagOptions = createSelector(
  selectShowTags,
  selectAllTags,
  (showTagIds, allTags): TagOptionsDTO => {
    const tagOptions = {
      showTags: [],
      remainingTags: [],
    } as TagOptionsDTO;

    if (!allTags || allTags.length === 0) return tagOptions;
    if (showTagIds.length === 0) {
      return { ...tagOptions, remainingTags: allTags };
    }

    tagOptions.remainingTags = [...allTags];
    tagOptions.showTags = [] as Tag[];

    showTagIds.forEach((id) => {
      const tagIndex = tagOptions.remainingTags.findIndex(
        (tag) => id === tag.id
      );

      if (tagIndex > -1) {
        tagOptions.showTags.push(
          tagOptions.remainingTags.splice(tagIndex, 1)[0]
        );
      }
    });
    return tagOptions;
  }
);
