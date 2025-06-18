import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api/products";
import { useCart } from "../context/CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err.message);
      }
    };

    loadProducts();
  }, []);

  const { dispatch } = useCart();

  const handleAddToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });

  return (
    <div className="product-list">
      <h2>F1 Производи</h2>
      <div className="products">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <Link to={`/products/${product._id}`}>   
            <img src={product.image} alt={product.name} width="150" />
            <h3>{product.name}</h3>
            </Link>
            <p>{product.description}</p>
            <strong>{product.price} ден</strong>
            <button onClick={() => handleAddToCart(product)}>
            Додај во кошничка
          </button>
          </div>
        ))}
      </div>
    </div>
  );
};
};

export default ProductList;
