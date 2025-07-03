import React from "react";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-muted-foreground">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="text-center md:text-left">
            <p className="font-medium">© {new Date().getFullYear()} F1 Shop</p>
            <p className="text-xs text-muted-foreground">
              Сите права се задржани.
            </p>
          </div>

        
          <div className="flex gap-4 items-center">
            <Link to="/about" className="hover:underline">За нас</Link>
            <Link to="/contact" className="hover:underline">Контакт</Link>
            <a
              href="https://www.formula1.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              Formula 1
            </a>
          </div>
        </div>

    

        
      </div>
    </footer>
  );
};

export default Footer;
