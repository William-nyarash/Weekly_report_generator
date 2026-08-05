import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? "/gti"
    : import.meta.env.VITE_BASE_URL,
});

export default api;
