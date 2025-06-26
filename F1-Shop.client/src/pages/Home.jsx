import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import ProductList from "../components/ProductList";
import { getProducts } from "../api/products";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProducts({ limit: 6 }); // прикажи само првите 6
        setProducts(data.products || data); // поддржува и без pagination
      } catch (err) {
        console.error("Неуспешно вчитување производи:", err.message);
      }
    };

    load();
  }, []);

  return (
    <div>
      

      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>🏁 Добредојде во F1 Продавницата!</h1>
        <p>Истражи производи од омилените F1 тимови!</p>
      </div>

      <ProductList products={products} />
    </div>
  );
};

export default Home;
