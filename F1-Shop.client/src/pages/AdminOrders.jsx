import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllOrders, statusUpdateOrder } from "../api/orders";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const AdminOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error("Грешка при вчитување на нарачки:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.isAdmin || user?.role === "admin") {
      loadOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await statusUpdateOrder(orderId, newStatus);
      await loadOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Грешка при промена на статус.");
    }
  };

  if (!user || (!user.isAdmin && user.role !== "admin")) {
    return <p className="text-center text-destructive">❌ Немате пристап до оваа страница.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>🧾 Сите нарачки</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Вчитување...</p>
          ) : orders.length === 0 ? (
            <p>Нема нарачки.</p>
          ) : (
            <ScrollArea className="overflow-x-auto">
              <table className="w-full text-sm border">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="p-2 border">Корисник</th>
                    <th className="p-2 border">Производи</th>
                    <th className="p-2 border">Вкупно</th>
                    <th className="p-2 border">Платено</th>
                    <th className="p-2 border">Датум</th>
                    <th className="p-2 border">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-muted/30">
                      <td className="p-2 border">
                        {order.user?.name} ({order.user?.email})
                      </td>
                      <td className="p-2 border">
                        <ul className="list-disc pl-5">
                          {order.items.map((item, idx) => (
                            <li key={idx}>
                              {item.product?.name} × {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-2 border">{order.totalPrice} ден</td>
                      <td className="p-2 border">{order.isPaid ? "✅ Да" : "❌ Не"}</td>
                      <td className="p-2 border">{new Date(order.createdAt).toLocaleString()}</td>
                      <td className="p-2 border">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="border rounded px-2 py-1"
                        >
                          <option value="pending">🕒 Pending</option>
                          <option value="approved">✅ Approved</option>
                          <option value="shipped">🚚 Shipped</option>
                          <option value="delivered">📦 Delivered</option>
                          <option value="cancelled">❌ Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;
