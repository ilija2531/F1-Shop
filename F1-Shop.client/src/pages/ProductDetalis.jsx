import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/products";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error loading product:", err.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Се вчитува...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
     <img
    src={
    product.image.startsWith("http")
      ? product.image
      : `http://localhost:5000${product.image.startsWith("/") ? product.image : "/" + product.image}`
  }
  alt={product.name}
  width="300"
/>
      <p>{product.description}</p>
      <p>Цена: {product.price} ден</p>
      <p>Достапност: {product.inStock ? "На залиха" : "Недостапно"}</p>
      <button onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}>
        Додај во кошничка
      </button>
    </div>
  );
};

export default ProductDetails;
