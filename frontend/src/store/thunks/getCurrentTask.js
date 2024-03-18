import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateApiInstance } from "../../axios";

export const getCurrentTask = createAsyncThunk(
  "current_task/get",
  async (task_id) => {
    const response = await privateApiInstance.get(`/task/${task_id}`);

    return response.data.task;
  }
);
