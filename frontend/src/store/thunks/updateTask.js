import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateApiInstance } from "../../axios";

export const updateTask = createAsyncThunk(
  "task/update",
  async ({ id, data }) => {
    const response = await privateApiInstance.put(`/task/${id}`, {
      ...data,
    });

    return response.data.task;
  }
);
