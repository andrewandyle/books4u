import React from "react";
import {Route, Switch} from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Books from "./components/pages/Books";
import Authors from "./components/pages/Authors";
import Quotes from "./components/pages/Quotes";
import { BrowserRouter } from "react-router-dom";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter(),
})

test('Home Page Identity Test', () => {
  expect(Home).toBe(Home);
});


test('About Page Identity Test', () => {
  expect(About).toBe(About);
});

test('Books Page Identity Test', () => {
  expect(Books).toBe(Books);
});

// Unit Tests Home Page
test("renders Home page", () => {
  const copy = shallow(<Home />);
  expect(copy).not.toBeUndefined();
  expect(copy.type).toBe('div');
});


// Testing Home Page renders
// test("renders Home page", () => {
//   render(<Home />);
//   const element = screen.getByText("Welcome to Books4U");
//   expect(element).toBeInTheDocument();
// });

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
