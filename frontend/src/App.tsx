import React from "react";
import "./App.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Authors from "./components/pages/Authors";
import Books from "./components/pages/Books";
import Quotes from "./components/pages/Quotes";
import AuthorInstance from "./components/pages/AuthorInstance";
import BookInstance from "./components/pages/BookInstance";
import QuoteInstance from "./components/pages/QuoteInstance";
import Navbar from "./components/features/Navbar";
import Search from "./components/pages/Search/Search.js";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: "#ffe4c4", minHeight: "100vh" }}>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/Books" component={Books} />
        <Route path="/authors" component={Authors} />
        <Route path="/quotes" component={Quotes} />
        <Route path="/book" component={BookInstance} />
        <Route path="/author" component={AuthorInstance} />
        <Route path="/quote" component={QuoteInstance} />
        <Route path="/search" exact component={Search} />
      </div>
    </BrowserRouter>
  );
}

export default App;
