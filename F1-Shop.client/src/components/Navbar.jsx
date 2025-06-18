import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      {user && (
        <>
      <Link to="/" style={{ marginRight: "1rem" }}>Дома</Link>
      <Link to="/cart" style={{ marginRight: "1rem" }}>Кошничка</Link>
      <Link to="/my-orders" style={{ marginRight: "1rem" }}>Мои нарачки</Link>
      </>
     ) }

      {user?.isAdmin && (
        <>
          <Link to="/admin" style={{ marginRight: "1rem" }}>Admin</Link>
          <Link to="/admin/orders" style={{ marginRight: "1rem" }}>Нарачки</Link>
        </>
      )}

      {user ? (
        <>
          <span style={{ marginRight: "1rem" }}>Здраво, {user.name}!</span>
          <button onClick={logout} style={{ cursor: "pointer" }}>Одјави се</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: "1rem" }}>Најава</Link>
          <Link to="/register">Регистрација</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
