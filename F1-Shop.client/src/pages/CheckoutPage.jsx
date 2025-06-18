import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const token = localStorage.getItem("token"); // 

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
    <div>
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Кошничката е празна</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item._id}>
                {item.name} × {item.quantity}
              </li>
            ))}
          </ul>
          <h3>Вкупно: {total} ден</h3>
          <button onClick={handleCheckout}>Нарачај</button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
