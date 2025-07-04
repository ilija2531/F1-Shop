import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProducts } from "../../api/products";
import ProductList from "../../components/ProductList";
import "./ProductListPage.css";
import FadeIn from "../../components/FadeIn";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProductListPage = () => {
  const query = useQuery();
  const initialCategory = query.get("category") || "";

  const [products, setProducts] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProducts({
          team: selectedTeam,
          category: selectedCategory,
          min: minPrice,
          max: maxPrice,
          name: searchTerm,
          page: currentPage,
          limit: 10,
        });
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Неуспешно вчитување продукти:", err.message);
      }
    };

    load();
  }, [selectedTeam, selectedCategory, minPrice, maxPrice, searchTerm, currentPage]);

  const teams = [
    "Mercedes", "Red Bull", "Ferrari", "McLaren",
    "Alpine", "Aston Martin", "Haas", "Alfa Romeo", "Williams"
  ];

  const categories = ["Кациги", "Капи", "Маици", "Комбинезони", "Патики"];

  return (
    <div className="product-list-page">
      <FadeIn className="fade-in" delay={0.2} duration={0.8}>
      <h2>🛒 F1 Производи</h2>

      
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Пребарај по име..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "0.5rem", width: "200px" }}
        />
      </div>

      
      <div style={{ marginBottom: "1rem" }}>
        <label>Филтрирај по тим: </label>
        <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
          <option value="">-- Сите --</option>
          {teams.map((team) => (
            <option key={team} value={team}>{team}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Филтрирај по категорија: </label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">-- Сите --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Цена: </label>
        <input
          type="number"
          placeholder="Мин"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={{ width: "80px", marginRight: "0.5rem" }}
        />
        <input
          type="number"
          placeholder="Макс"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{ width: "80px" }}
        />
      </div>

      
      <ProductList products={products} />

     
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              margin: "0 0.25rem",
              padding: "0.5rem 1rem",
              backgroundColor: currentPage === i + 1 ? "black" : "white",
              color: currentPage === i + 1 ? "white" : "black",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
      </FadeIn>
    </div>
  );
};

export default ProductListPage;
