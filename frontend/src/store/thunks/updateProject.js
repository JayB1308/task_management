import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateApiInstance } from "../../axios";

const updateProject = createAsyncThunk(
  "project/update",
  async ({ id, data }) => {
    const response = await privateApiInstance.put(`/project/${id}`, {
      ...data,
    });

    return response.data.project;
  }
);

export { updateProject };
