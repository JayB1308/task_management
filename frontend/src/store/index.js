import { configureStore } from "@reduxjs/toolkit";
import { tokensReducer } from "./slices/tokensSlice";
import { userReducer } from "./slices/usersSlice";
import { tabReducer } from "./slices/tabSlices";

export const store = configureStore({
  reducer: {
    tokens: tokensReducer,
    user: userReducer,
    tab: tabReducer,
  },
});

export * from "./thunks/loginUser";
