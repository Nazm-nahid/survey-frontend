import axios from "axios";
import { useAuthStore } from "~/stores/auth";

export const useApi = () => {
  const auth = useAuthStore();

  const api = axios.create({
    baseURL: "http://localhost:3001",
    headers: { "Content-Type": "application/json" },
  });

  api.interceptors.request.use((config) => {
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    } else {
         navigateTo("/login"); 
    }
    return config;
  });

  return api;
};
