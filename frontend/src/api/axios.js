import axios from "axios";

let accessToken = "";

export const setAccessToken = (token) => {
  accessToken = token;
  console.log("✅ Token Saved:", accessToken);
};

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => {
  accessToken = "";
};

const API = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    console.log("➡️ Current Token:", accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log("Authorization Header Added");
    } else {
      console.log("❌ No Access Token");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;