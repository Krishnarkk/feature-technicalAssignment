import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://coreapi.hectorai.live/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
