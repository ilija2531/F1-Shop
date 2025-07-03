import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const CheckoutPage = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    phone: "",
    notes: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartCheckout = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/payments/create-checkout-session",
        {
          items: cart,
          user: {
            name: formData.fullName,
            email: formData.email,
          },
          shipping: {
            fullName: formData.fullName,
            address: formData.address,
            city: formData.city,
            phone: formData.phone,
            
          },
        }
      );

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
          ) : !showForm ? (
            <>
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

              <Separator className="my-4" />

              <div className="text-right text-lg font-semibold mb-4">
                Вкупно: {total} ден
              </div>

              <div className="text-right">
                <Button onClick={handleStartCheckout}>Нарачај</Button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Име и презиме</Label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>


              <div>
                <Label>Адреса</Label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label>Град</Label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label>Телефон</Label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>


              <div className="text-right">
                <Button type="submit">Продолжи кон плаќање</Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;
