import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateApiInstance } from "../../axios";

const getProjects = createAsyncThunk("projects/get", async ({ team_id }) => {
  const response = await privateApiInstance.get(`/project/?team_id=${team_id}`);

  return response.data.data;
});

export { getProjects };
