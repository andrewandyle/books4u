import React from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import "./Home.css";

// Icons
import Logo from "../../media/logo.png";
import Book from "../../media/book.png";
import Author from "../../media/author.png";
import Quote from "../../media/quote.png";

function Home() {
  return (
    <div className="body">
      <Marquee speed={40} gradient={false} style={{ height: 258 }}>
        <div className="bookshelf"></div>
      </Marquee>

      <div className="text-center text-light mt-5 mb-5">
        <img src={Logo} alt="Books4U" />
        <h1>Welcome to Books For You!</h1>
        <h4>
          Explore the literary world and search for information on your favorite
          literature.
        </h4>
      </div>

      <div className="container">
        <div className="d-flex flex-row justify-content-between">
          <Link className="btn btn-danger btn-lg" to="/books">
            <img className="icon" src={Book} alt="Books" />
            Browse Books
          </Link>
          <Link className="btn btn-danger btn-lg" to="/authors">
            <img className="icon" src={Author} alt="Authors" />
            Browse Authors
          </Link>
          <Link className="btn btn-danger btn-lg" to="/quotes">
            <img className="icon" src={Quote} alt="Quotes" />
            Browse Quotes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
