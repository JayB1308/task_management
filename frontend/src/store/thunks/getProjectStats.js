import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateApiInstance } from "../../axios";

export const getProjectStats = createAsyncThunk(
  "stats/projects",
  async ({ team_id }) => {
    const response = await privateApiInstance.get(
      `/project/stats?team_id=${team_id}`
    );

    return response.data;
  }
);
