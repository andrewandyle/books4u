import React from "react";
import "./App.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Authors from "./components/pages/Authors";
import Books from "./components/pages/Books";
import BooksPagination from "./components/pages/BooksPagination";
import QuotesPagination from "./components/pages/QuotesPagination";
import Quotes from "./components/pages/Quotes";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import AuthorInstance from "./components/pages/templates/AuthorInstance";
import BookInstance from "./components/pages/templates/BookInstance";
import QuoteInstance from "./components/pages/templates/QuoteInstance";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/books" component={BooksPagination} />
        <Route path="/authors" component={Authors} />
        <Route path="/quotes" component={QuotesPagination} />
        <Route path="/book" component={BookInstance} />
        <Route path="/author" component={AuthorInstance} />
        <Route path="/quote" component={QuoteInstance} />
      </div>
    </BrowserRouter>
  );
}

export default App;
