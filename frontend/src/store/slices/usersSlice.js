import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../thunks/loginUser";

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    access_token: null,
    refresh_token: null,
    error: null,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.access_token = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.isLoggedIn = true;
      state.isLoading = false;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
      state.isLoggedIn = false;
    });
  },
});

export const { logout, setAccessToken } = userSlice.actions;
export const userReducer = userSlice.reducer;
