import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/usersSlice";
import { tabReducer } from "./slices/tabSlices";
import { projectReducer } from "./slices/projectSlices";
import { teamReducer } from "./slices/teamSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tab: tabReducer,
    project: projectReducer,
    team: teamReducer,
  },
});

export * from "./thunks/loginUser";
export * from "./thunks/getTeam";
