import axios from "axios";

export const api = axios.create({
  baseURL: process.env.URL_PUBLIC_API || "http://localhost:3333/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
