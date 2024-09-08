import axios from "axios";

// const API_URL = "http://localhost:3000";
const API_URL = "https://api-mytems.onrender.com";

export const api = axios.create({
  baseURL: API_URL,
});
