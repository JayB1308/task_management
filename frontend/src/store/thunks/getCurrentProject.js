import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateApiInstance } from "../../axios";

const getCurrentProject = createAsyncThunk(
  "currentProject/get",
  async (project_id) => {
    const response = await privateApiInstance.get(`/project/${project_id}`);

    return response.data.project;
  }
);

export { getCurrentProject };
