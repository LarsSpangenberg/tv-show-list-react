import { configureStore } from '@reduxjs/toolkit';

import showsReducer from './shows';

export default configureStore({
  reducer: {
    shows: showsReducer,
  },
});