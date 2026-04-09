import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvaWQiOiJnYXphbGEucGFydmVlbkB0aWdlcmFuYWx5dGljcy5jb20iLCJuYW1lIjoiR2F6YWxhIFBhcnZlZW4iLCJlbWFpbCI6ImdhemFsYS5wYXJ2ZWVuQHRpZ2VyYW5hbHl0aWNzLmNvbSIsInJvbGVfaWQiOjEsImV4cCI6MTkxMDAwMDAwMH0.-znHmi8p-mk8p4voUHfUa0ZWD5HC6b7X3kdtnM8dZZ0`;
    // if (token) {
    //   config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvaWQiOiJnYXphbGEucGFydmVlbkB0aWdlcmFuYWx5dGljcy5jb20iLCJuYW1lIjoiR2F6YWxhIFBhcnZlZW4iLCJlbWFpbCI6ImdhemFsYS5wYXJ2ZWVuQHRpZ2VyYW5hbHl0aWNzLmNvbSIsInJvbGVfaWQiOjEsImV4cCI6MTkxMDAwMDAwMH0.-znHmi8p-mk8p4voUHfUa0ZWD5HC6b7X3kdtnM8dZZ0`;
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;