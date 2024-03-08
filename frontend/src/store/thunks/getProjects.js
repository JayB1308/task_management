import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateApiInstance } from "../../axios";

const getProjects = createAsyncThunk("projects/get", async () => {});
