import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { getProducts } from "../api/products";

const Home = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="space-y-8">
    
      <div className="bg-yellow-400 text-center py-3 font-semibold text-black">
        🎉 20% попуст на сите производи со Max Verstappen – само оваа недела!
      </div>

    
      <div className="text-center py-4">
        <h1 className="text-3xl font-bold">🏁 Добредојде во F1 Продавницата!</h1>
        <p className="text-muted-foreground">Истражи производи од омилените F1 тимови!</p>
      </div>

      
      <section className="px-4">
        <h2 className="text-2xl font-semibold mb-4">🔥 Избрани производи</h2>
        <ProductList products={products} />
      </section>

     
      <section className="px-4">
        <h2 className="text-2xl font-semibold mb-4">📸 Галерија</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(6)].map((_, i) => (
            <img
              key={i}
              src={`/gallery/gallery${i + 1}.jpg`}
              alt="gallery"
              className="rounded-lg shadow-md object-cover h-40 w-full"
              onError={(e) => (e.target.style.display = "none")}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
