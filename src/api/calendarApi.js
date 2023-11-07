import axios from "axios";

const calendarApi = axios.create({
  baseURL: "https://calendar-app-dlnf.onrender.com/api",
});

calendarApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };

  return config;
});

export default calendarApi;
