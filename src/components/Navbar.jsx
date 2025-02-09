import React from "react";
import { FaUtensils } from "react-icons/fa"; // Import the food-related icon
import "./Navbar.css"; // Import your CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="menu-icon">
        <FaUtensils /> {/* Food menu icon */}
      </div>
      <h1 className="navbar-title">Restaurant Finder</h1>
    </nav>
  );
};

export default Navbar;
