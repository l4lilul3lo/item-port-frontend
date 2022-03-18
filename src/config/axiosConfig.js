import axios from "axios";
let url;
if (process.env.NODE_ENV === "local") {
  url = "http://localhost:4000";
}

if (process.env.WSL_IP) {
  const wslIP = process.env.WSL_IP;
  process.env.HOST = "0.0.0.0"; // set react host to 0.0.0.0
  url = `http://${wslIP}:4000`;
}

if (process.env.NODE_ENV === "production") {
  // do thang.
}

const mainAxios = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export { mainAxios };
