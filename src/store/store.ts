import { configureStore } from '@reduxjs/toolkit';

import uiReducer from './appData/UiSlice';
import checkedListItemsReducer from './appData/CheckedListItemsSlice';
import filtersReducer from './appData/FiltersSlice';

import showsReducer from './userData/ShowsSlice';
import showDetailsReducer from './userData/ShowDetailsSlice';
import tagsReducer from './userData/TagsSlice';

const store = configureStore({
  reducer: {
    shows: showsReducer,
    showDetails: showDetailsReducer,
    tags: tagsReducer,
    ui: uiReducer,
    checkedListItems: checkedListItemsReducer,
    filters: filtersReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
