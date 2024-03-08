import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateApiInstance } from "../../axios";

const createProject = createAsyncThunk("project/user", async (project) => {
  const response = await privateApiInstance.post("/project", { ...project });

  return response.data;
});

export { createProject };
