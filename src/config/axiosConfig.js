import axios from "axios";

const mainAxios = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export { mainAxios };
