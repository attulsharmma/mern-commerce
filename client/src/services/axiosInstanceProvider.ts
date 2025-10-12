import axios, { type AxiosInstance } from "axios";
import { toast } from "sonner";
// import { useStore } from "@/store/store";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";



const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },

});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    toast.error("Request setup failed");
    return Promise.reject(error);
  }
);

// Response interceptor — only errors
axiosInstance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
