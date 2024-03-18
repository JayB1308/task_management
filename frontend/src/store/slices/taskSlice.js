import { createSlice } from "@reduxjs/toolkit";
import { createTask } from "../thunks/createTask";
import { getTasks } from "../thunks/getTasks";
import { getCurrentTask } from "../thunks/getCurrentTask";
import { deleteTask } from "../thunks/deleteTask";
import { updateTask } from "../thunks/updateTask";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    currentTask: null,
  },

  reducers: {
    setCurrentTask(state, action) {
      state.currentTask = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(createTask.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    });

    builder.addCase(getTasks.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: action.payload,
      };
    });

    builder.addCase(getCurrentTask.fulfilled, (state, action) => {
      return {
        ...state,
        currentTask: action.payload,
      };
    });

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const newTasks = state.tasks.filter((task) => task.id !== action.payload);
      return {
        ...state,
        tasks: newTasks,
      };
    });

    builder.addCase(updateTask.fulfilled, (state, action) => {
      return {
        ...state,
        currentTask: action.payload,
      };
    });
  },
});

export const { setCurrentTask } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
