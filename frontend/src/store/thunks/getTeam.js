import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateApiInstance } from "../../axios";

const getTeam = createAsyncThunk("team/get", async (team_id) => {
  try {
    const response = await privateApiInstance.get(`/team/${team_id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
});

export { getTeam };
