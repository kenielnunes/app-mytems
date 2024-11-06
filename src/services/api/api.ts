import axios from "axios";
import { parseCookies } from "nookies";

const API_URL = "http://localhost:4000";
// const API_URL = "https://api-mytems.onrender.com";

const { auth: autoToken } = parseCookies();
export const api = axios.create({
  baseURL: API_URL,
});

api.defaults.headers["Authorization"] = `Bearer ${autoToken}`;
