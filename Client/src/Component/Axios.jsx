import axios from "axios";

export const BookbaseURL = axios.create({
  baseURL: "http://localhost:5000/api/books",
});