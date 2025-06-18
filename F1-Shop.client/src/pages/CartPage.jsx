import React from "react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, dispatch } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Кошничка</h2>
      {cart.length === 0 ? (
        <p>Кошничката е празна</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item._id}>
                {item.name} × {item.quantity} = {item.price * item.quantity} ден
                <button onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item._id })}>
                  Избриши
                </button>
              </li>
            ))}
          </ul>
          <h3>Вкупно: {total} ден</h3>
        </>
      )}
    </div>
  );
};

export default CartPage;
