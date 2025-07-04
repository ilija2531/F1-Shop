import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, deleteProduct } from "../api/products";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FadeIn from "../components/FadeIn";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useCart();
  const { user } = useAuth();

  const handleDelete = async (id) => {
    if (window.confirm("Дали сте сигурни дека сакате да го избришете овој производ?")) {
      try {
        await deleteProduct(id);
        alert("✅ Производот е избришан.");
        window.location.href = "/products";
      } catch (err) {
        console.error("❌ Грешка при бришење:", err.message);
        alert("Настана грешка при бришење.");
      }
    }
  };

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

  if (!product) return <p className="text-center">Се вчитува...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <FadeIn className="mb-6" delay={0.2} duration={0.8}>
        <Separator />
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <img
            src={
              product.image.startsWith("http")
                ? product.image
                : `http://localhost:5000${product.image.startsWith("/") ? product.image : "/" + product.image}`
            }
            alt={product.name}
            className="mx-auto rounded-md shadow w-full max-w-sm"
          />

          <p className="whitespace-pre-line text-gray-700">{product.description}</p>
          <p>
            <strong>Цена:</strong> {product.price} ден
          </p>
          <p>
            <strong>Достапност:</strong> {product.inStock ? "На залиха" : "Недостапно"}
          </p>

          <Separator />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <Button
              onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
              className="w-full sm:w-auto"
            >
              🛒 Додај во кошничка
            </Button>

            {user?.isAdmin && (
              <Button
                variant="destructive"
                onClick={() => handleDelete(product._id)}
                className="w-full sm:w-auto"
              >
                🗑️ Избриши
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      </FadeIn>
    </div>
  );
};

export default ProductDetails;
