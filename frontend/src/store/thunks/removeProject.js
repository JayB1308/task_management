import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateApiInstance } from "../../axios";

const removeProject = createAsyncThunk(
  "project/remove",
  async ({ project_id }) => {
    const response = await privateApiInstance.delete(`/project/${project_id}`);

    if (response.status === 200) {
      return project_id;
    }
  }
);

export { removeProject };
