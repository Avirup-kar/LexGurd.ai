import axios from "axios";
import { useAuth } from "@clerk/react";

export const useApi = () => {
  const { getToken } = useAuth();

  const api = axios.create({
    baseURL: import.meta.env.VITE_BASEURL || "http://localhost:3000",
  });

  // 🔥 Attach token automatically
  api.interceptors.request.use(async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return api;
};