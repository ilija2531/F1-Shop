import axios from "axios";

export const getAllOrders = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:5000/api/orders/all", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getMyOrders = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:5000/api/orders/my", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteMyOrder = async (orderId) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
