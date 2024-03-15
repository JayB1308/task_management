import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateApiInstance } from "../../axios";

export const createTask = createAsyncThunk("task/create", async (data) => {
  const response = await privateApiInstance.post("/task/", data);

  return response.data.task;
});
