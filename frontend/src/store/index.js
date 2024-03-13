import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/usersSlice";
import { tabReducer } from "./slices/tabSlices";
import { projectReducer } from "./slices/projectSlices";
import { teamReducer } from "./slices/teamSlice";
import { modalReducers } from "./slices/modalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tab: tabReducer,
    project: projectReducer,
    team: teamReducer,
    modal: modalReducers,
  },
});

export * from "./thunks/loginUser";
export * from "./thunks/getTeam";
export * from "./thunks/getProjects";
export * from "./thunks/createProject";
export * from "./thunks/getProjectStats";
export * from "./thunks/getCurrentProject";
export * from "./thunks/updateProject";
export * from "./thunks/removeProject";
