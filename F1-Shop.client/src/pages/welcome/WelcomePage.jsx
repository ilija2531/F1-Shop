import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/f1-hero.jpg"; 

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">

      <div className="backdrop-blur-sm bg-white/70 rounded-lg p-8 shadow-xl max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">🏁 Добредојде во F1 Shop</h1>
        <p className="text-gray-600 mb-6">
          Откриј уникатни производи инспирирани од Формула 1. Тимски артикли, облека, додатоци и повеќе!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={() => navigate("/products")}>Разгледај производи</Button>
          <Button variant="outline" onClick={() => navigate("/login")}>Најави се</Button>
        </div>
      </div>
      </div>

  );
};

export default WelcomePage;
