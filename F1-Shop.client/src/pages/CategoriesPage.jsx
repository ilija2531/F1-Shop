
import React from "react";
import { useNavigate } from "react-router-dom";
import FadeIn from "../components/FadeIn";

const categories = [
  {
    name: "Капи",
    image: "/categories/cap.jpg",
    key: "Капи"
  },
  {
    name: "Маици",
    image: "/categories/shirt.jpg",
    key: "Маици"
  },
  {
    name: "Кациги",
    image: "/categories/helmet.jpg",
    key: "Кациги"
  },
  {
    name: "Комбинезони",
    image: "/categories/suit.jpg",
    key: "Комбинезони"
  },
  {
    name: "Патики",
    image: "/categories/shoes.jpg",
    key: "Патики"
  }
];

const CategoriesPage = () => {
  const navigate = useNavigate();

  const goToCategory = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <FadeIn className="mb-10" delay={0.2} duration={0.8}>
      <h1 className="text-3xl font-bold mb-6 text-center">Категории на производи</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.key}
            onClick={() => goToCategory(cat.key)}
            className="cursor-pointer bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform"
          >
            <img src={cat.image} alt={cat.name} className="w-full h-48 object-cover" />
            <div className="p-4 text-center text-lg font-medium">{cat.name}</div>
          </div>
        ))}
      </div>
      </FadeIn>
    </div>
  );
};

export default CategoriesPage;
