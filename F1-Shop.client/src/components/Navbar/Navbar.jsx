import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          {user && (
            <>
              <Link to="/home">Дома</Link>
              <Link to="/products">Производи</Link>
              <Link to="/cart">Кошничка</Link>
              <Link to="/my-orders">Мои нарачки</Link>
              <Link to="/profile">Профил</Link>
            </>
          )}

          {user?.isAdmin && (
            <>
              <Link to="/admin">Admin</Link>
              <Link to="/admin/orders">Нарачки</Link>
              <Link to="/admin/users">Корисници</Link>
            </>
          )}
        </div>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <img
              src={
                user.avatar
                  ? `http://localhost:5000${user.avatar}`
                  : "/default-avatar.png"
              }
              alt="avatar"
              className="navbar-avatar"
            />
            <span className="username">Здраво, {user.name}!</span>
            <button className="logout-btn" onClick={logout}>
              Одјави се
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Најава</Link>
            <Link to="/register">Регистрација</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
