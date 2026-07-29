import axios from "axios";
import { env } from "./env";
import { store } from "@/store";
import { selectAccessToken } from "@/store/slices/authSlice";

const axiosInstance = axios.create({
  baseURL: env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Read token from Redux store (source of truth at runtime).
    // Falls back to the store value; persists via localStorage on boot.
    const token = selectAccessToken(store.getState());
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;