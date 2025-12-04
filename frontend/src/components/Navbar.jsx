import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Cart from "./Cart";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            Marketplace
          </Link>
        </div>

        <div className="nav-right">
          {isAuthenticated && (
            <>
              <div className="nav-links">
                <Link to="/orders" className="nav-link">
                  Orders
                </Link>
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </div>

              <button
                className="nav-cart"
                onClick={() => setIsCartOpen((p) => !p)}
              >
                <span className="nav-cart-icon">🛒</span>
                <span>Cart ({itemCount})</span>
              </button>

              <span className="nav-user">{user?.email}</span>

              <button className="nav-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </>
  );
};

export default Navbar;
