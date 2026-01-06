import axios from "axios";

const token = localStorage.getItem("token");
export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("No token found in localStorage");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
