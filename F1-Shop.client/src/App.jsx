import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetalis";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import AdminOrders from "./pages/AdminOrders";
import MyOrders from "./pages/MyOrders";
import AdminUsers from "./pages/AdminUsers";
import AdminUserDetails from "./pages/AdminUserDetalis";
import WelcomePage from "./pages/welcome/WelcomePage";
import ProductListPage from "./pages/productlist/ProductListPage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";
import CategoriesPage from "./pages/CategoriesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";


const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Router>
    <Layout>
      <div className="app">
        <Routes>
         
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/users/:id" element={<AdminUserDetails />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          
          
          {/* Redirect to home for any unmatched routes */}
          
        </Routes>
      </div>
    </Layout>
    </Router>
    </ThemeProvider>
  );
}

export default App;


