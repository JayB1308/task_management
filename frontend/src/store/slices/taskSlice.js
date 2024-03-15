import { createSlice } from "@reduxjs/toolkit";
import { createTask } from "../thunks/createTask";
import { getTasks } from "../thunks/getTasks";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    currentTask: null,
  },

  reducers: {
    setCurrentProject(state, action) {
      state.currentTask = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.push(action.payload);
    });

    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
  },
});

export const { setCurrentProject } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
