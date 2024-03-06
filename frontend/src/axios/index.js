import axios from "axios";
import { store } from "../store";
import { setAccessToken } from "../store/slices/tokensSlice";
import { logout } from "../store/slices/usersSlice";

export const apiInstance = axios.create({
  baseURL: "http://localhost:5000",
});

axios.interceptors.request.use(
  (config) => {
    const { access_token } = store.getState();
    config.headers.Authorization = `Bearer ${access_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          "http://localhost:5000/auth/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${store.getState().refresh_token}`,
            },
          }
        );
        store.dispatch(setAccessToken(response.data.access_token));
        originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
      } catch (error) {
        console.error("Failed to refresh token", error);
        store.dispatch(logout());

        return Promise.reject(error);
      }
    }
  }
);
