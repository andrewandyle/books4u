import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// Icons
import Logo from "../../media/logo.png";
import User from "../../media/user.png";
import Book from "../../media/book.png";
import Author from "../../media/author.png";
import Quote from "../../media/quote.png";

function Navbar() {
  return (
    <nav
      className="navbar navbar-dark navbar-expand-lg"
      style={{ backgroundColor: "#654321" }}
    >
      <Link to="/" className="navbar-brand">
        <img
          src={Logo}
          width={30}
          alt="Books4U"
          style={{ marginLeft: 20, marginRight: 10 }}
        />
        Books4U
      </Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/about" className="nav-link">
              <img className="nav-icon" src={User} alt="About" />
              About
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/books" className="nav-link">
              <img className="nav-icon" src={Book} alt="Books" />
              Books
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/authors" className="nav-link">
              <img className="nav-icon" src={Author} alt="Authors" />
              Authors
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/quotes" className="nav-link">
              <img className="nav-icon" src={Quote} alt="Quotes" />
              Quotes
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
