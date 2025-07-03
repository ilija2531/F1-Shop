import React, { useEffect, useRef, useState } from "react";
import ProductList from "../components/ProductList";
import { getProducts } from "../api/products";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const galleryRef = useRef(null);
  const totalImages = 24;

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProducts();
        if (Array.isArray(data)) {
          setProducts(data.slice(0, 6));
        } else if (Array.isArray(data.products)) {
          setProducts(data.products.slice(0, 6));
        } else {
          console.error("Непознат формат на податоци", data);
        }
      } catch (err) {
        console.error("Неуспешно вчитување производи:", err.message);
      }
    };

    load();
  }, []);

  const scrollGallery = (direction) => {
    const container = galleryRef.current;
    if (!container) return;

    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center py-4">
        <h1 className="text-3xl font-bold">🏁 Добредојде во F1 Shop!</h1>
        <p className="text-muted-foreground">
          Истражи производи од омилените F1 тимови!
        </p>
      </div>

      <section className="px-4">
        <h2 className="text-2xl font-semibold mb-4">🔥 Избрани производи</h2>
        <ProductList products={products} />
      </section>

      <section className="px-4">
        <h2 className="text-2xl font-semibold mb-4">📸 Галерија</h2>

        <div className="relative">
          <button
            onClick={() => scrollGallery("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-gray-800 rounded-full shadow hover:bg-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={galleryRef}
            className="flex overflow-x-auto no-scrollbar gap-4 scroll-smooth px-8"
          >
            {[...Array(totalImages)].map((_, i) => (
              <img
                key={i}
                src={`/gallery/gallery${i + 1}.jpg`}
                alt={`gallery-${i}`}
                className="rounded-lg shadow-md object-cover w-64 h-48 flex-shrink-0 transition-transform hover:scale-105"
                onError={(e) => (e.target.style.display = "none")}
              />
            ))}
          </div>

          <button
            onClick={() => scrollGallery("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-gray-800 rounded-full shadow hover:bg-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
