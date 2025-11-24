// src/utils/axiosInstance.js
import axios from "axios";
import { getAccessToken, getRefreshToken, clearAuth } from "./auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Attach token
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 properly
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) return Promise.reject(error);

    // Only logout if refresh token ALSO fails
    if (error.response.status === 401) {
      const refresh = getRefreshToken();

      if (!refresh) {
        clearAuth();
        window.location.href = "/admin/login";
        return;
      }

      // Try refreshing token
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}admin/refresh/`,
          { refresh }
        );

        const newAccessToken = res.data.access;
        localStorage.setItem("admin_access_token", newAccessToken);

        // Retry original request
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(error.config);
      } catch (err) {
        clearAuth();
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
