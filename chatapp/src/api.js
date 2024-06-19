import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2015/api",
});

export default api;
