import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    open: (state, action) => {
      state.isOpen = true;
    },
    close: (state, action) => {
      state.isOpen = false;
    },
  },
});

export const { open, close } = modalSlice.actions;
export const modalReducers = modalSlice.reducer;
