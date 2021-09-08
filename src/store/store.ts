import { configureStore } from '@reduxjs/toolkit';

import uiReducer from './app-data/UiSlice';
import checkedListItemsReducer from './app-data/CheckedListItemsSlice';
import filtersReducer from './app-data/FiltersSlice';

import showsReducer from './user-data/ShowsSlice';
import showDetailsReducer from './user-data/ShowDetailsSlice';
import tagsReducer from './user-data/TagsSlice';

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
