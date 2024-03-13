import { createSlice } from "@reduxjs/toolkit";
import { createProject } from "../thunks/createProject";
import { getProjects } from "../thunks/getProjects";
import { getProjectStats } from "../thunks/getProjectStats";
import { getCurrentProject } from "../thunks/getCurrentProject";
import { updateProject } from "../thunks/updateProject";
import { removeProject } from "../thunks/removeProject";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    currentProject: null,
    isLoading: false,
    error: null,
    stats: {},
  },
  reducers: {
    setCurrentProject(state, action) {
      state.currentProject = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getProjects.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
    });

    builder.addCase(createProject.fulfilled, (state, action) => {
      state.projects.push(action.payload);
    });

    builder.addCase(getProjectStats.fulfilled, (state, action) => {
      state.stats = action.payload;
    });

    builder.addCase(getCurrentProject.fulfilled, (state, action) => {
      state.currentProject = action.payload;
    });

    builder.addCase(updateProject.fulfilled, (state, action) => {
      state.currentProject = action.payload;
    });

    builder.addCase(removeProject.fulfilled, (state, action) => {
      state.currentProject = null;
      state.projects = state.projects.filter((project) => {
        return project.id !== action.payload;
      });
    });
  },
});

export const { setCurrentProject } = projectSlice.actions;
export const projectReducer = projectSlice.reducer;
