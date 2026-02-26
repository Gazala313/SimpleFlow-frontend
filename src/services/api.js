import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: BASE_URL,
});

export const setAuthToken = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};


export default api;
