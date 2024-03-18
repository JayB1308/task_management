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
      return {
        ...state,
        access_token: action.payload,
      };
    },
    logout: (state, action) => {
      return {
        ...state,
        user: null,
        isLoading: false,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        isLoading: false,
        isLoggedIn: true,
      };
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isLoggedIn: false,
      };
    });
  },
});

export const { logout, setAccessToken } = userSlice.actions;
export const userReducer = userSlice.reducer;
