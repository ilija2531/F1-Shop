import React, { useEffect, useState } from "react";
import { getMyOrders, deleteMyOrder } from "../api/orders";
import { useAuth } from "../context/AuthContext";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data);
    } catch (err) {
      console.error("Неуспешно вчитување нарачки:", err.message);
    }
  };

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const handleCancel = async (orderId) => {
    if (!window.confirm("Дали сте сигурни дека сакате да ја откажете нарачката?")) return;
    try {
      await deleteMyOrder(orderId);
      alert("Нарачката е откажана.");
      loadOrders(); 
    } catch (err) {
      alert(err.response?.data?.message || "Грешка при откажување.");
    }
  };

  if (!user) return <p>Мора да сте најавени за да ги видите вашите нарачки.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🛍️ Моите нарачки</h2>
      {orders.length === 0 ? (
        <p>Немате направено ниту една нарачка.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Производи</th>
              <th>Вкупно</th>
              <th>Платено</th>
              <th>Датум</th>
              <th>Акција</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <ul style={{ paddingLeft: "1rem" }}>
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.product?.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{order.totalPrice} ден</td>
                <td>{order.isPaid ? "✅ Да" : "❌ Не"}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  {!order.isPaid ? (
                    <button
                      onClick={() => handleCancel(order._id)}
                      style={{
                        backgroundColor: "red",
                        color: "#fff",
                        border: "none",
                        padding: "0.3rem 0.6rem",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}
                    >
                      Откажи
                    </button>
                  ) : (
                    <span style={{ color: "#888" }}>Нема</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
