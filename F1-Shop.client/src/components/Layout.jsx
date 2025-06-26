import React from "react";
import Navbar from "./Navbar/Navbar";
import bgImage from "../assets/f1-hero.jpg";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
  <div
  className="min-h-screen bg-cover bg-center"
  style={{ backgroundImage: `url(${bgImage})` }}
>
  <div className="min-h-screen backdrop-blur-sm bg-white/70 dark:bg-black/70 text-black dark:text-white">
    <Navbar />
    <main className="pt-4 px-4">{children}</main>
    <Footer/>
  </div>
</div>


  );
};

export default Layout;
