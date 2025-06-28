import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";

const ProductList = ({ products }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  if (!Array.isArray(products)) {
    return <p className="text-red-600 text-center">⚠ Проблем: Производите не се валидна листа.</p>;
  }

  return (
    <div className="px-6 py-8">
      <div className="flex flex-wrap gap-6 justify-center">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-md p-4 w-60 transition hover:shadow-lg"
          >
            <Link to={`/products/${product._id}`} className="block text-center">
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="h-32 mx-auto mb-3 object-contain"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{product.description}</p>
            <p className="text-md font-medium mt-2 text-gray-800 dark:text-gray-200">
              {product.price} ден
            </p>
            <Button
              onClick={() => handleAddToCart(product)}
              className="w-full mt-3"
            >
              Додај во кошничка
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
