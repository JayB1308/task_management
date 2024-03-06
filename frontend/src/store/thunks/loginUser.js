import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "../../axios";

const loginUser = createAsyncThunk(
  "users/login",
  async ({ username, password }) => {
    const response = await apiInstance.post("/auth/login", {
      username: username,
      password: password,
    });
    return response.data;
  }
);

export { loginUser };
