import axios from "axios";

const API_URL = "http://localhost:3001";
// const API_URL = "https://api-mytems.onrender.com";

export const api = axios.create({
  baseURL: API_URL,
});
