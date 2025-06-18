import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, dispatch } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🛒 Кошничка</h2>

      {cart.length === 0 ? (
        <p>Кошничката е празна.</p>
      ) : (
        <div style={{ maxWidth: "600px", marginTop: "1rem" }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item) => (
              <li
                key={item._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #ccc",
                  padding: "0.5rem 0",
                }}
              >
                <div>
                  <strong>{item.name}</strong> × {item.quantity}
                  <br />
                  <small>{item.price} ден по парче</small>
                </div>
                <div>
                  {item.price * item.quantity} ден{" "}
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_CART", payload: item._id })
                    }
                    style={{
                      marginLeft: "1rem",
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "0.3rem 0.7rem",
                      cursor: "pointer",
                    }}
                  >
                    Избриши
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
            <strong>Вкупно: {total} ден</strong>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <Link to="/checkout">
              <button
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                Продолжи на Checkout →
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
