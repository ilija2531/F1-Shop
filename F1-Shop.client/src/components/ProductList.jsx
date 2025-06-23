import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductList = ({ products }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  if (!Array.isArray(products)) {
    return <p style={{ color: "red" }}>⚠ Проблем: Производите не се валидна листа.</p>;
  }

  return (
    <div className="product-list" style={{ padding: "2rem" }}>
      <h2>🏎️ F1 Производи</h2>
      <div
        className="products"
        style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="product-card"
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              width: "200px",
              borderRadius: "8px",
            }}
          >
            <Link
              to={`/products/${product._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                width="150"
                style={{ display: "block", margin: "0 auto 0.5rem" }}
              />
              <h3 style={{ fontSize: "1.1rem" }}>{product.name}</h3>
            </Link>
            <p>{product.description}</p>
            <strong>{product.price} ден</strong>
            <br />
            <button
              onClick={() => handleAddToCart(product)}
              style={{
                marginTop: "0.5rem",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                padding: "0.3rem 0.6rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Додај во кошничка
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
