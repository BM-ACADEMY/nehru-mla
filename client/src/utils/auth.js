// src/utils/auth.js

export const getAccessToken = () => localStorage.getItem("admin_access_token");
export const getRefreshToken = () => localStorage.getItem("admin_refresh_token");

export const clearAuth = () => {
  localStorage.removeItem("admin_access_token");
  localStorage.removeItem("admin_refresh_token");
};

// ❌ NO TOKEN EXPIRY CHECKING ON FRONTEND

export const isAuthenticated = () => {
  const token = getAccessToken();
  return !!token;
};
