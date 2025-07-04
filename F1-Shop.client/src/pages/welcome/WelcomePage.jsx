import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-4 py-10 space-y-16">
      <FadeIn className="mb-10" delay={0.2} duration={0.8}>
      <div className="max-w-4xl mx-auto flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-10 w-full text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            🏁 Добредојде во <span className="text-red-600">F1 Shop</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
            Откриј ексклузивни продукти инспирирани од Formula 1 – тимски артикли, облека, додатоци и многу повеќе!
          </p>

          <div className="mb-8 text-left sm:text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              👤 Придобивки од регистрација
            </h2>
            <ul className="space-y-2 max-w-md mx-auto">
              {[
                "Историја и следење на нарачки",
                "Ексклузивни попусти само за членови",
                "Брз и безбеден checkout процес",
                "Оцени и коментари за производи",
                "Персонализирани препораки",
              ].map((benefit, index) => (
                <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="flex-1 sm:max-w-xs" onClick={() => navigate("/products")}>
              Разгледај производи
            </Button>
            <Button variant="outline" className="flex-1 sm:max-w-xs" onClick={() => navigate("/login")}>
              Најави се
            </Button>
          </div>
        </div>
      </div>

      <br/><br/><br/>
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          📽️ Види што нѐ прави уникатни
        </h2>
        <div className="rounded-lg overflow-hidden shadow-lg aspect-video">
          <video controls className="w-full h-full object-cover" autoPlay loop muted>
            <source src="/videos/promo-video.mp4" type="video/mp4" />
           
          </video>
        </div>
      </div>
      </FadeIn>
    </div>
  );
};

export default WelcomePage;
