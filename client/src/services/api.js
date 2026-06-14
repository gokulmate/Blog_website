import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/blogs",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllBlogs = () => api.get("/");

export const getBlogById = (id) => api.get(`/${id}`);

export const createBlog = (data) => api.post("/", data);

export const updateBlog = (id, data) =>
  api.put(`/${id}`, data);

export const deleteBlog = (id) =>
  api.delete(`/${id}`);

export default api;