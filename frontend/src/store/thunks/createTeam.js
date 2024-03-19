import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateApiInstance } from "../../axios";

export const createTeam = createAsyncThunk("team/create", async (data) => {
  const response = await privateApiInstance.post("/team/", { ...data });

  return response.data.team;
});
