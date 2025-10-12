import axios, { type AxiosInstance } from "axios";
import { toast } from "sonner";
// import { useStore } from "@/store/store";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

interface AxiosRequestConfigExtended {
  skipToast?: boolean; // optional flag to skip error toast
}

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
    // const store = useStore.getState();
    const status = error.response?.status;
    const message = error.response?.data?.message || "Something went wrong!";
    const config = error.config as AxiosRequestConfigExtended;

    // skip toast if flag is set
    if (!config?.skipToast) {
      if (status === 401) {
        toast.error("Unauthorized. Logging out...");
        // store.auth.logout();
      } else if (status === 404) {
        toast.error("Resource not found!");
      } else if (status >= 500) {
        toast.error("Server error. Try again later!");
      } else {
        toast.error(message);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
