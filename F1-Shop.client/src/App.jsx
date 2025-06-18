import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetalis";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";



const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
         
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Add more routes as needed */}
          {/* Example: <Route path="/products" element={<ProductList />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


