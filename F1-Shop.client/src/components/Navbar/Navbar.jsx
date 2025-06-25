import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle"; 
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar px-4 py-3 shadow-md flex justify-between items-center bg-white dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className={`flex-col md:flex md:flex-row md:gap-4 ${menuOpen ? "flex" : "hidden md:flex"}`}>
          {user && (
            <>
              <Link to="/home">Дома</Link>
              <Link to="/products">Производи</Link>
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

      <div className="flex items-center gap-4">
        <ModeToggle /> {/* 👈 Додадено тука */}

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={user.avatar ? `http://localhost:5000${user.avatar}` : "/default-avatar.png"}
                  alt={user.name}
                />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/profile">Профил</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/cart">Кошничка</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/my-orders">Мои нарачки</Link>
              </DropdownMenuItem>
              {user?.isAdmin && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/admin">Admin</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin/orders">Нарачки</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin/users">Корисници</Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>🚪 Одјави се</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link to="/login">
              <Button variant="outline">Најава</Button>
            </Link>
            <Link to="/register">
              <Button>Регистрација</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
