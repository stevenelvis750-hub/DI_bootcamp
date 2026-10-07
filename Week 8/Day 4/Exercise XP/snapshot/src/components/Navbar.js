import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar">
    <Link to="/category/mountains">Mountains</Link>
    <Link to="/category/beaches">Beaches</Link>
    <Link to="/category/birds">Birds</Link>
    <Link to="/category/food">Food</Link>
    <Link to="/search">Search</Link>
  </nav>
);

export default Navbar;
