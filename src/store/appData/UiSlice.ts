import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  ignoreSidebarClose: boolean;
  isSidebarOpen: boolean;
}

const initialState: UiState = {
  ignoreSidebarClose: false,
  isSidebarOpen: false,
} 

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openSidebar(state) {
      state.isSidebarOpen = true;
    },
    closeSidebar(state) {
      if (state.isSidebarOpen && !state.ignoreSidebarClose) {
        state.isSidebarOpen = false;
      }
    },
    setIgnoreSidebarClose(state, action: PayloadAction<boolean>) {
      state.ignoreSidebarClose = action.payload;
    },
  },
});

export const { openSidebar, closeSidebar, setIgnoreSidebarClose } =
  uiSlice.actions;

export default uiSlice.reducer;
