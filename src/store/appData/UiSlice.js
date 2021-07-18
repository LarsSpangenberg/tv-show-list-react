import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isSidebarOpen: false,
  },
  reducers: {
    openSidebar(state) {
      state.isSidebarOpen = true;
    },
    closeSidebar(state) {
      if (state.isSidebarOpen) state.isSidebarOpen = false;
    },
  },
});

export const { openSidebar, closeSidebar } = uiSlice.actions;

export default uiSlice.reducer;
