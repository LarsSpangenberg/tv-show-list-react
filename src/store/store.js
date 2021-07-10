import { configureStore } from '@reduxjs/toolkit';

import uiReducer from './UiSlice';
import showsReducer from './ShowsSlice';
import showDetailsReducer from './ShowDetailsSlice';
import checkedListItemsReducer from './CheckedListItemsSlice';

export default configureStore({
  reducer: {
    ui: uiReducer,
    shows: showsReducer,
    showDetails: showDetailsReducer,
    checkedListItems: checkedListItemsReducer,
  },
});
