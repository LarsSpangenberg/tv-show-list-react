import { configureStore } from '@reduxjs/toolkit';

import showsReducer from 'store/ShowsSlice';
import showDetailsReducer from 'store/ShowDetailsSlice';

export default configureStore({
  reducer: {
    shows: showsReducer,
    showDetails: showDetailsReducer,
  },
});