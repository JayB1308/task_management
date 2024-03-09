import { createSlice } from "@reduxjs/toolkit";
import { getTeam } from "../thunks/getTeam";

const teamSlice = createSlice({
  name: "team",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const teamReducer = teamSlice.reducer;
