import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateApiInstance } from "../../axios";

export const joinTeam = createAsyncThunk("team/join", async ({ name }) => {
  const response = await privateApiInstance.put("/team/", { name: name });

  return response.data.team;
});
