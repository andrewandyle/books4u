import React from "react";
import "./App.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
      </div>
    </BrowserRouter>
  );
}

export default App;
