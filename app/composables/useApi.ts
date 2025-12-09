import axios from "axios";

export const useApi = () => {
  const api = axios.create({
    baseURL: "http://localhost:3001",
    headers: { "Content-Type": "application/json" },
  });

  api.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
         navigateTo("/login"); 
    }
    return config;
  });

  return api;
};
