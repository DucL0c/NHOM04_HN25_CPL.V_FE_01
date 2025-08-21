import axios from "axios";
import { authStore } from "../auth/auth.store";

const axiosClient = axios.create({
  baseURL: "https://bkstoreapi.kiennt.dev/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = authStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (err) => {
    if (err.response?.status === 401) {
      authStore.getState().clearAuth();
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
