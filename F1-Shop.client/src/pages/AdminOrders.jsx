import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllOrders } from "../api/orders";

const AdminOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    if (user?.isAdmin || user?.role === "admin") {
      loadOrders();
    } else {
      setLoading(false); // stop loading even if access is denied
    }
  }, [user]);

  if (!user || (!user.isAdmin && user.role !== "admin")) {
    return <p>❌ Немате пристап до оваа страница.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🧾 Сите нарачки</h2>

      {loading ? (
        <p>Вчитување...</p>
      ) : orders.length === 0 ? (
        <p>Нема нарачки.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{
            borderCollapse: "collapse",
            width: "100%",
            marginTop: "1rem",
          }}
        >
          <thead style={{ backgroundColor: "#000" }}>
            <tr>
              <th>Корисник</th>
              <th>Производи</th>
              <th>Вкупно</th>
              <th>Платено</th>
              <th>Датум</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  {order.user?.name} ({order.user?.email})
                </td>
                <td>
                  <ul style={{ paddingLeft: "1rem", margin: 0 }}>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;
