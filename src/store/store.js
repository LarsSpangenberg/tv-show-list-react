import { configureStore } from '@reduxjs/toolkit';

import showsReducer from './ShowsSlice';
import showDetailsReducer from './ShowDetailsSlice';
import checkedListItemsReducer from './CheckedListItemsSlice';

export default configureStore({
  reducer: {
    shows: showsReducer,
    showDetails: showDetailsReducer,
    checkedListItems: checkedListItemsReducer,
  },
});
