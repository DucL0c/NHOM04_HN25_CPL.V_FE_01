// src/services/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_BASE_URL || "https://localhost:7061",
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

export default axiosClient;
