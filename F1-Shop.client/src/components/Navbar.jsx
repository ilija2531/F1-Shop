import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Дома</Link> | <Link to="/cart">Кошничка</Link>{" "}
      {user ? (
        <>
          | Здраво, {user.name}! <button onClick={logout}>Одјави се</button>
        </>
      ) : (
        <>
          | <Link to="/login">Најава</Link> | <Link to="/register">Регистрација</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
