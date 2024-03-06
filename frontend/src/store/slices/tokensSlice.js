import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../thunks/loginUser";

const tokensSlice = createSlice({
  name: "tokens",
  initialState: {
    access_token: null,
    refresh_token: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setAccessToken(state, action) {
      state.access_token = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { setAccessToken } = tokensSlice.actions;
export const tokensReducer = tokensSlice.reducer;
