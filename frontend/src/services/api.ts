import axios, { type AxiosInstance } from "axios";

// Create an Axios instance with proper type
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string || "http://localhost:5000/api",
});

export default api;
