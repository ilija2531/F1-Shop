import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const CheckoutPage = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/payments/create-checkout-session", {
        items: cart,
        user: {
          name: user.name,
          email: user.email,
        },
      });

      
      window.location.href = res.data.url;
    } catch (err) {
      console.error("Stripe error:", err);
      alert("Настана грешка при плаќањето.");
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
