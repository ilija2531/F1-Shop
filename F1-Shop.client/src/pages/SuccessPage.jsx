import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { sendOrderEmail } from "../../utils/sendOrderEmail";

const SuccessPage = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const { dispatch } = useCart();

  useEffect(() => {
    const finishOrder = async () => {
      if (!sessionId) return;

      try {
        const stripeRes = await axios.get(`http://localhost:5000/api/payments/session/${sessionId}`);
        const session = stripeRes.data;

        const cart = JSON.parse(session.metadata.cart);
        const total = session.metadata.total;
        const email = session.metadata.userEmail;
        const name = session.metadata.userName;

        
        const token = localStorage.getItem("token");
        const items = cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        }));

        await axios.post(
          "http://localhost:5000/api/orders",
          { items, totalPrice: total },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        
        await sendOrderEmail({
          name,
          email,
          orderItems: cart,
          total,
        });

        dispatch({ type: "CLEAR_CART" });
      } catch (err) {
        console.error("❌ Неуспешна потврда:", err);
      }
    };

    finishOrder();
  }, [sessionId]);

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold text-green-600">✅ Плаќањето беше успешно!</h2>
      <p className="mt-4">Ќе добиете потврда по е-пошта.</p>
    </div>
  );
};

export default SuccessPage;
