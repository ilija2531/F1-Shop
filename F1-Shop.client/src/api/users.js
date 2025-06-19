import axios from "axios";

export const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:5000/api/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getUserById = async (userId) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

