import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
  <Link to="/" className="navbar-brand">Books4U</Link>
  <div className="collpase navbar-collapse">
  <ul className="navbar-nav mr-auto">
    <li className="navbar-item">
    <Link to="/about" className="nav-link">About</Link>
    </li>
    <li className="navbar-item">
    <Link to="/books" className="nav-link">Books</Link>
    </li>
    <li className="navbar-item">
    <Link to="/authors" className="nav-link">Authors</Link>
    </li>
    <li className="navbar-item">
    <Link to="/quotes" className="nav-link">Quotes</Link>
    </li>
  </ul>
  </div>
</nav>;
}

export default Navbar;
