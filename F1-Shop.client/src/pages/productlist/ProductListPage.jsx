import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import ProductList from "../../components/ProductList";
import Navbar from "../../components/Navbar/Navbar";
import "./ProductListPage.css";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
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
          min: minPrice,
          max: maxPrice,
          name: searchTerm,
          page: currentPage,
          limit: 6,
        });
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Неуспешно вчитување продукти:", err.message);
      }
    };

    load();
  }, [selectedTeam, minPrice, maxPrice, searchTerm, currentPage]);

  const teams = [
    "Mercedes", "Red Bull", "Ferrari", "McLaren",
    "Alpine", "Aston Martin", "Haas", "Alfa Romeo", "Williams"
  ];

  return (
    <div>
      <Navbar />

      <div className="product-list-page">
        <h2>🛒 F1 Производи</h2>

        {/* Search Input */}
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Пребарај по име..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "0.5rem", width: "200px" }}
          />
        </div>

        {/* Team Filter */}
        <div style={{ marginBottom: "1rem" }}>
          <label>Филтрирај по тим: </label>
          <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
            <option value="">-- Сите --</option>
            {teams.map((team) => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div style={{ marginBottom: "1.5rem" }}>
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

        {/* Product List */}
        <ProductList products={products} />

        {/* Pagination */}
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
      </div>
    </div>
  );
};

export default ProductListPage;
