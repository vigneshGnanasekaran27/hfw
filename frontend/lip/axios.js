// lib/axios.js
import axios from "axios";

let accessToken = null;
let csrfToken = null;

const api = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  withCredentials: true, // allow cookies
});

// Attach access token and CSRF to requests
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  if (csrfToken) {
    config.headers["X-CSRF-TOKEN"] = csrfToken;
  }
  return config;
});

// Handle token refresh if access token expired
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await api.post("/refresh");
        accessToken = res.data.access;
        csrfToken = res.data.csrf;
        return api(originalRequest);
      } catch (e) {
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export function setTokens({ access, csrf }) {
  accessToken = access;
  csrfToken = csrf;
}

export default api;
