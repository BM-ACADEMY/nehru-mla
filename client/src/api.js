import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// Attach access token to every request
API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("admin_access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// NO REFRESH LOGIC ANYMORE
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Access token invalid → logout
      localStorage.removeItem("admin_access_token");
      localStorage.removeItem("admin_refresh_token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default API;
