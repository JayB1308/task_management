import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/usersSlice";
import { tabReducer } from "./slices/tabSlices";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tab: tabReducer,
  },
});

export * from "./thunks/loginUser";
