import axios from "axios";

//debugge
const api = axios.create({
  baseURL: "http://localhost:3001",
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("@TOKEN");

    if (token) {
      config.headers["Authorization"] = `${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
