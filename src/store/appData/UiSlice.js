import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    ignoreSidebarClose: false,
    isSidebarOpen: false,
  },
  reducers: {
    openSidebar(state) {
      state.isSidebarOpen = true;
    },
    closeSidebar(state) {
      if (state.isSidebarOpen && !state.ignoreSidebarClose) {
        state.isSidebarOpen = false;
      }
    },
    setIgnoreSidebarClose(state, action) {
      state.ignoreSidebarClose = action.payload;
    },
  },
});

export const { openSidebar, closeSidebar, setIgnoreSidebarClose } =
  uiSlice.actions;

export default uiSlice.reducer;
