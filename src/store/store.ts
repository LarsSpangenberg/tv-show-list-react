import { configureStore } from '@reduxjs/toolkit';

import uiReducer from './app-data/UiSlice';
import checkedListItemsReducer from './app-data/CheckedListItemsSlice';
import filtersReducer from './app-data/FiltersSlice';

import showDetailsReducer from './app-data/ShowDetailsSlice';
import api from './api';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    showDetails: showDetailsReducer,
    ui: uiReducer,
    checkedListItems: checkedListItemsReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
