import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    currentProject: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setCurrentProject(state, action) {
      state.currentProject = action.payload;
    },
  },
});

export const { setCurrentProject } = projectSlice.actions;
export const projectReducer = projectSlice.reducer;
