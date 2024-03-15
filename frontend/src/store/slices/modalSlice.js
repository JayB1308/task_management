import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    id: null,
    isOpen: false,
  },
  reducers: {
    open: (state, action) => {
      state.isOpen = true;
      state.id = action.payload.id;
    },
    close: (state, action) => {
      state.isOpen = false;
      if (state.id === action.payload.id) {
        state.id = null;
      }
    },
  },
});

export const { open, close } = modalSlice.actions;
export const modalReducers = modalSlice.reducer;
