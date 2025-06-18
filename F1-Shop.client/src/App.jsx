import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetalis";
import CartPage from "./pages/CartPage";


const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          {/* Add more routes as needed */}
          {/* Example: <Route path="/products" element={<ProductList />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


