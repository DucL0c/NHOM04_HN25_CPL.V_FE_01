// src/services/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

export default axiosClient;
