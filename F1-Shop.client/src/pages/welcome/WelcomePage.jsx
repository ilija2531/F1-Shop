import React from "react";
import { Link } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-overlay">
        <h1 className="welcome-title">🏁 Добредојдовте во F1 Shop</h1>
        <p className="welcome-subtitle">Официјална платформа за продажба на Formula 1 производи</p>
        <div className="welcome-buttons">
          <Link to="/products" className="btn">Разгледај Производи</Link>
          <Link to="/login" className="btn-outline">Најави се</Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
