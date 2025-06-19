import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/products";
import "./ProductListPage.css";
import Navbar from "../../components/Navbar/Navbar";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProducts(selectedTeam);
        setProducts(data);
      } catch (err) {
        console.error("Неуспешно вчитување продукти:", err.message);
      }
    };

    load();
  }, [selectedTeam]);

  const teams = ["Mercedes", "Red Bull", "Ferrari", "McLaren", "Alpine", "Aston Martin", "Haas", "Alfa Romeo", "Williams"];

  return (
    <div>
      <Navbar />
    <div className="product-list-page">
      <h2>🛒 F1 Производи</h2>
      <div style={{ marginBottom: "1rem" }}>
  <label>Филтрирај по тим: </label>
  <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
    <option value="">-- Сите --</option>
    {teams.map((team) => (
      <option key={team} value={team}>{team}</option>
    ))}
  </select>
    </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <Link to={`/products/${product._id}`}>
              <img src={`http://localhost:5000${product.image}`} alt={product.name} />
              <h3>{product.name}</h3>
            </Link>
            <p>{product.price} ден</p>
            <Link to={`/products/${product._id}`} className="details-btn">Детали</Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ProductListPage;
