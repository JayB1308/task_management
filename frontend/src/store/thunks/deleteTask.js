import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateApiInstance } from "../../axios";

export const deleteTask = createAsyncThunk("delete/task", async (task_id) => {
  const response = await privateApiInstance.delete(`/task/${task_id}`);

  if (response.status === 204) {
    return task_id;
  }
});
