import axios from "axios";
import { tokenService } from "./token";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
});

// Attach token
axiosInstance.interceptors.request.use((config) => {
  const token = tokenService.getAccessToken();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
