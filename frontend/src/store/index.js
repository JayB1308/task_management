import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/usersSlice";
import { tabReducer } from "./slices/tabSlices";
import { projectReducer } from "./slices/projectSlices";
import { teamReducer } from "./slices/teamSlice";
import { modalReducers } from "./slices/modalSlice";
import { taskReducer } from "./slices/taskSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tab: tabReducer,
    project: projectReducer,
    team: teamReducer,
    modal: modalReducers,
    task: taskReducer,
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
export * from "./thunks/createTask";
export * from "./thunks/getTasks";
export * from "./thunks/getCurrentTask";
export * from "./thunks/deleteTask";
export * from "./thunks/updateTask";
