import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const CheckoutPage = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");

    const items = cart.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    }));

    try {
      await axios.post(
        "http://localhost:5000/api/orders",
        { items, totalPrice: total },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch({ type: "CLEAR_CART" });
      alert("Нарачката е успешно направена!");
      navigate("/");
    } catch (err) {
      console.error("Нарачка не успеа:", err.response?.data || err.message);
      alert("Мора да сте најавени за да направите нарачка.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>💳 Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          {cart.length === 0 ? (
            <p className="text-center">Кошничката е празна</p>
          ) : (
            <div className="space-y-4">
              <ul className="space-y-2">
                {cart.map((item) => (
                  <li key={item._id} className="flex justify-between">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>{item.price * item.quantity} ден</span>
                  </li>
                ))}
              </ul>

              <Separator />

              <div className="text-right text-lg font-semibold">
                Вкупно: {total} ден
              </div>

              <div className="text-right">
                <Button onClick={handleCheckout}>Нарачај</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;
