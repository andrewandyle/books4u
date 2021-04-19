import React, { useRef } from "react";
import { Link } from "react-router-dom";

// Icons
import Logo from "../../media/logo.png";
import User from "../../media/user.png";
import Book from "../../media/book.png";
import Author from "../../media/author.png";
import Quote from "../../media/quote.png";
import Chart from "../../media/chart.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const searchText: any = useRef();
  const search = () => {
    window.location.assign(`/search/q=${searchText.current.value}/model=all`);
  };

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
          style={{ marginLeft: 7, marginRight: 10 }}
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
          <li className="navbar-item">
            <Link to="/our-visualizations" className="nav-link">
              <img className="nav-icon" src={Chart} alt="Chart" />
              Our Visualizations
            </Link>
          </li>
        </ul>
      </div>

      <div className="search-margin input-group">
        <div className="form-outline" id="authors-search">
          <input
            type="search"
            ref={searchText}
            className="form-control"
            placeholder="Search all pages..."
            onKeyPress={(event: any) => {
              if (event.key === "Enter") {
                search();
              }
            }}
          />
        </div>
        <button className="btn btn-primary" onClick={() => search()}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
