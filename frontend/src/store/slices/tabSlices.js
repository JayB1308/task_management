import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
  name: "tabSlice",
  initialState: {
    currentTab: null,
  },
  reducers: {
    changeTab(state, action) {
      state.currentTab = action.payload;
    },
  },
});

export const { changeTab } = tabSlice.actions;
export const tabReducer = tabSlice.reducer;
