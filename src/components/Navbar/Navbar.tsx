import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
  </nav>;
}

export default Navbar;
