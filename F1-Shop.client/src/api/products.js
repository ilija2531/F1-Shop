import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const getProducts = async (team) => {
  const url = team
    ? `http://localhost:5000/api/products?team=${encodeURIComponent(team)}`
    : "http://localhost:5000/api/products";

  const res = await axios.get(url);
  return res.data;
};


export const getProductById = async (id) => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};
