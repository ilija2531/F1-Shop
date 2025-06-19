import React from "react";
import Navbar from "../components/Navbar/Navbar";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <div>
      <h1>Добредојде во F1 Продавницата!</h1>
      <Navbar/>
      <ProductList />
    </div>
  );
};

export default Home;
