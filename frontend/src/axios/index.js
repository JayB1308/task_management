import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout, setAccessToken } from "../store/slices/usersSlice";

export const apiInstance = axios.create({
  baseURL: "http://localhost:5000",
});

export const privateApiInstance = axios.create({
  baseURL: "http://localhost:5000",
});

privateApiInstance.interceptors.request.use(
  (config) => {
    const access_token = useSelector((state) => state.user.access_token);
    config.headers.Authorization = `Bearer ${access_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const dispatch = useDispatch();
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh_token = useSelector((state) => state.user.refresh_token);
      try {
        const response = await axios.post(
          "http://localhost:5000/auth/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${refresh_token}`,
            },
          }
        );
        dispatch(setAccessToken(response.data.access_token));
        originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
      } catch (error) {
        console.error("Failed to refresh token", error);
        dispatch(logout());

        return Promise.reject(error);
      }
    }
  }
);
