import axios from "axios";

//Get API address from environment variable, not available: http://localhost:8000
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

//Create an "axios instance" to call the API.
const httpClient = axios.create({
  baseURL: API_BASE_URL,
});

export default httpClient;
