import { createSlice } from "@reduxjs/toolkit";
import { getTeam } from "../thunks/getTeam";
import { createTeam } from "../thunks/createTeam";
import { joinTeam } from "../thunks/joinTeam";

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
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      })
      .addCase(getTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder.addCase(createTeam.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    });

    builder.addCase(joinTeam.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    });
  },
});

export const teamReducer = teamSlice.reducer;
