import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Books from "./components/pages/Books";
import Authors from "./components/pages/Authors";
import Quotes from "./components/pages/Quotes";
import { BrowserRouter } from "react-router-dom";

// Testing Home Page renders
test("renders Home page", () => {
  render(<Home />);
  const element = screen.getByText("Welcome to Books4U");
  expect(element).toBeInTheDocument();
});

// // Testing About Page renders
// test("renders About page", () => {
//   render(renderInRouter(<About />));
//   const element = screen.getByText("About Us");
//   expect(element).toBeInTheDocument();
// });

// // Testing Books Page renders
// test("renders Books page", () => {
//   render(renderInRouter(<Books />));
//   const element = screen.getByText("Books");
//   expect(element).toBeInTheDocument();
// });

// // Testing Authors Page renders
// test("renders Authors page", () => {
//   render(renderInRouter(<Authors />));
//   const element = screen.getByText("Authors");
//   expect(element).toBeInTheDocument();
// });

// // Testing Quotes Page renders
// test("renders Quotes page", () => {
//   render(renderInRouter(<Quotes />));
//   const element = screen.getByText("Quotes");
//   expect(element).toBeInTheDocument();
// });
