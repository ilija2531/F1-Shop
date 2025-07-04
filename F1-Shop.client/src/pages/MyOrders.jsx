import React, { useEffect, useState } from "react";
import { getMyOrders, deleteMyOrder } from "../api/orders";
import { useAuth } from "../context/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FadeIn from "../components/FadeIn";

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

  if (!user) return <p className="text-center">Мора да сте најавени за да ги видите вашите нарачки.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <FadeIn className="mb-6" delay={0.2} duration={0.8}>
        <Separator />
      <Card>
        <CardHeader>
          <CardTitle>🛍️ Моите нарачки</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-center">Немате направено ниту една нарачка.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b bg-muted">
                    <th className="text-left p-2">Производи</th>
                    <th className="text-left p-2">Вкупно</th>
                    <th className="text-left p-2">Платено</th>
                    <th className="text-left p-2">Датум</th>
                    <th className="text-left p-2">Акција</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-muted/30">
                      <td className="p-2">
                        <ul className="list-disc pl-4">
                          {order.items.map((item, idx) => (
                            <li key={idx}>
                              {item.product?.name} × {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-2">{order.totalPrice} ден</td>
                      <td className="p-2">{order.isPaid ? "✅ Да" : "❌ Не"}</td>
                      <td className="p-2">{new Date(order.createdAt).toLocaleString()}</td>
                      <td className="p-2">
                        {!order.isPaid ? (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleCancel(order._id)}
                          >
                            Откажи
                          </Button>
                        ) : (
                          <span className="text-muted-foreground text-xs">Нема</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      </FadeIn>
    </div>
  );
};

export default MyOrders;
