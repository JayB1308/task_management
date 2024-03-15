import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateApiInstance } from "../../axios";

export const getTasks = createAsyncThunk("task/get", async (project_id) => {
  const response = await privateApiInstance.get(
    `/task/?project_id=${project_id}`
  );

  return response.data.tasks;
});
