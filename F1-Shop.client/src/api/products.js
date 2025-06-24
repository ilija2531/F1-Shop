import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.team) params.append("team", filters.team);
  if (filters.min) params.append("min", filters.min);
  if (filters.max) params.append("max", filters.max);
  if (filters.name) params.append("name", filters.name); 
  if (filters.page) params.append("page", filters.page);
  if (filters.limit) params.append("limit", filters.limit);

  const res = await axios.get(`http://localhost:5000/api/products?${params.toString()}`);
  return res.data;
};



export const getProductById = async (id) => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");

  const res = await axios.delete(`http://localhost:5000/api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
