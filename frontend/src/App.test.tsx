import React from "react";
import {Route, Switch} from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Books from "./components/pages/Books";
import BookItem from "./components/templates/Grid/items/BookItem";
import AuthorInstance from "./components/pages/AuthorInstance";
import BookInstance from "./components/pages/BookInstance";
import QuoteInstance from "./components/pages/QuoteInstance";
import { BrowserRouter } from "react-router-dom";
import Enzyme, { configure, mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

/* Simple Unit Tests Home Page */
test("renders Home page not undefined", () => {
  const wrapper = shallow(<Home />);
  expect(wrapper).not.toBeUndefined();
});

/* Simple Unit Tests Home Page */
test("checks Home page link numbers", () => {
  const wrapper = shallow(<Home />);
  expect(wrapper.find("Link").length).toEqual(3);
});

/* Simple Unit Tests for Home Page */
test("Home page divs check", () => {
  const wrapper = shallow(<Home />);
  expect(wrapper.find("div").length).toEqual(5);
});

/* Simple Unit Tests for About Page */
test("renders About page not undefined", () => {
  const wrapper = shallow(<About />);
  expect(wrapper).not.toBeUndefined();
});

/* Simple Unit Tests for About Page */
test("About page divs check", () => {
  const wrapper = shallow(<About />);
  expect(wrapper.find("div").length).toEqual(17);
});

/* Simple Unit Tests for About Page */
test("About page loading check", () => {
  const wrapper = shallow(<About />);
  expect(wrapper.find("Loading").length).toEqual(1);
});

/* Simple Unit Tests Books Page */
test("renders Books page not undefined", () => {
  const wrapper = shallow(<Books />);
  expect(wrapper).not.toBeUndefined();
});

/* Simple Unit Tests Books Page */
test("checks if Loading page exists for books page", () => {
  const wrapper = shallow(<Books />);
  expect(wrapper.find("Loading").length).toEqual(1);
});

/* Grid Item test for Books*/
test ('Make sure that Book Item component exists given data test 1',() => {
  const book1 = {
    "author_ids": [
      {
        "author_id": 0, 
        "book_id": 1
      }
    ], 
      "authors": [
        "'James Dashner'"
      ], 
      "avg_rating": 4.0, 
      "description": "The first book in the blockbuster phenomenon The Maze Runner series now features chapters from the highly-anticipated series conclusion, The Fever Code, the book that finally reveals the story of how the maze was built! This special movie tie-in edition includes an eight-page full-color insert with photos from the film. The Maze Runner and Maze Runner: The Scorch Trials are now major motion pictures featuring the star of MTV's Teen Wolf, Dylan O\u2019Brien; Kaya Scodelario; Aml Ameen; Will Poulter; and Thomas Brodie-Sangster. The third movie, Maze Runner: The Death Cure, will hit screens in 2018. When Thomas wakes up in the lift, the only thing he can remember is his name. He\u2019s surrounded by strangers\u2014boys whose memories are also gone. Outside the towering stone walls that surround them is a limitless, ever-changing maze. It\u2019s the only way out\u2014and no one\u2019s ever made it through alive. Then a girl arrives. The first girl ever. And the message she delivers is terrifying: Remember. Survive. Run. Also look for James Dashner\u2019s edge-of-your-seat MORTALITY DOCTRINE series! Praise for the Maze Runner series: A #1 New York Times Bestselling Series A USA Today Bestseller A Kirkus Reviews Best Teen Book of the Year An ALA-YASLA Best Fiction for Young Adults Book An ALA-YALSA Quick Pick \"{A} mysterious survival saga that passionate fans describe as a fusion of Lord of the Flies, The Hunger Games, and Lost.\"\u2014EW \u201cWonderful action writing\u2014fast-paced\u2026but smart and well observed.\u201d\u2014Newsday \u201c{A} nail-biting must-read.\u201d\u2014Seventeen \u201cBreathless, cinematic action.\u201d\u2014Publishers Weekly \u201cHeart pounding to the very last moment.\u201d\u2014Kirkus Reviews \u201cExclamation-worthy.\u201d\u2014Romantic Times \u201cJames Dashner\u2019s illuminating prequel {The Kill Order} will thrill fans of this Maze Runner {series} and prove just as exciting for readers new to the series.\u201d\u2014Shelf Awareness, Starred \"Take a deep breath before you start any James Dashner book.\"-Deseret News", 
      "genres": [
        "'Young Adult Fiction'"
      ], 
      "id": 1, 
      "image": "http://books.google.com/books/content?id=jcJWAAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", 
      "language": "en", 
      "maturity_rating": "NOT_MATURE", 
      "name": "The Maze Runner Movie Tie-In Edition (Maze Runner, Book One)", 
      "num_ratings": 4, 
      "page_count": 416, 
      "price": null, 
      "purchase_link": null, 
      "year": "2014-08-05",
    "quote_ids": [
      {
        "book_id": 1, 
        "quote_id": 0
      }
    ]
  }
	const instance = mount(<Router><BookItem item={book1}/> </Router>);
	expect(instance).not.toBeUndefined();
});

/* Grid Item  test for Books*/
test ('Make sure that Book Item component exists given data test 2',() => {
  const book2 = {
    "author_ids": [
      {
        "author_id": 1, 
        "book_id": 5
      }
    ], 
      "authors": [
        "'William T. Vollmann'"
      ], 
      "avg_rating": 4.0, 
      "description": "A series of interconnected stories seeks to contrast the moral decisions made by famous and everyday individuals with regard to the warring authoritarian cultures of Germany and the USSR in the twentieth century, from a pair of generals who collaborate with the enemy to two heroes who place themselves at risk for their countries. Reprint.", 
      "genres": [
        "'Fiction'"
      ], 
      "id": 5, 
      "image": "http://books.google.com/books/content?id=Pu0kDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", 
      "language": "en", 
      "maturity_rating": "NOT_MATURE", 
      "name": "Europe Central", 
      "num_ratings": 9, 
      "page_count": 811, 
      "price": null, 
      "purchase_link": null, 
      "year": "2005",
    "quote_ids": [
      {
        "book_id": 5, 
        "quote_id": 1
      }
    ]
  }
	const instance = mount(<Router><BookItem item={book2}/> </Router>);
	expect(instance).not.toBeUndefined();
});

/* Grid Item  test for Books*/
test ('Make sure that Book Item component exists given data test 3',() => {
  const book3 = {
    "author_ids": [
      {
        "author_id": 4, 
        "book_id": 55
      }
    ], 
      "authors": [
        "'Jonathan Raban'"
      ], 
      "avg_rating": null, 
      "description": "The author of Bad Land realizes a lifelong dream as he navigates the waters of the Mississippi River in a spartan sixteen-foot motorboat, producing yet another masterpiece of contemporary American travel writing. In the course of his voyage, Raban records the mercurial caprices of the river and the astonishingly varied lives of the people who live along its banks. Whether he is fishing for walleye or hunting coon, discussing theology in Prairie Du Chien or race relations in Memphis, he is an expert observer of the heartyland's estrangement from America's capitals ot power and culture, and its helpless nostalgia for its lost past. Witty, elegaic, and magnificently erudite, Old Glory is as filled with strong currents as the Mississippi itself.", 
      "genres": [
        "'Travel'"
      ], 
      "id": 55, 
      "image": "http://books.google.com/books/content?id=SuRdVgJR9F8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", 
      "language": "en", 
      "maturity_rating": "NOT_MATURE", 
      "name": "Old Glory", 
      "num_ratings": null, 
      "page_count": 416, 
      "price": 11.99, 
      "purchase_link": "https://play.google.com/store/books/details?id=SuRdVgJR9F8C&rdid=book-SuRdVgJR9F8C&rdot=1&source=gbs_api", 
      "year": "2011-05-25",
    "quote_ids": [
      {
        "book_id": 55, 
        "quote_id": 4
      }
    ]
  }
	const instance = mount(<Router><BookItem item={book3}/> </Router>);
	expect(instance).not.toBeUndefined();
});

/* Grid Item test for Books*/
test ('Make sure that Book Item component exists given data test 3',() => {
  const book3 = {
    "author_ids": [
      {
        "author_id": 4, 
        "book_id": 55
      }
    ], 
      "authors": [
        "'Jonathan Raban'"
      ], 
      "avg_rating": null, 
      "description": "The author of Bad Land realizes a lifelong dream as he navigates the waters of the Mississippi River in a spartan sixteen-foot motorboat, producing yet another masterpiece of contemporary American travel writing. In the course of his voyage, Raban records the mercurial caprices of the river and the astonishingly varied lives of the people who live along its banks. Whether he is fishing for walleye or hunting coon, discussing theology in Prairie Du Chien or race relations in Memphis, he is an expert observer of the heartyland's estrangement from America's capitals ot power and culture, and its helpless nostalgia for its lost past. Witty, elegaic, and magnificently erudite, Old Glory is as filled with strong currents as the Mississippi itself.", 
      "genres": [
        "'Travel'"
      ], 
      "id": 55, 
      "image": "http://books.google.com/books/content?id=SuRdVgJR9F8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", 
      "language": "en", 
      "maturity_rating": "NOT_MATURE", 
      "name": "Old Glory", 
      "num_ratings": null, 
      "page_count": 416, 
      "price": 11.99, 
      "purchase_link": "https://play.google.com/store/books/details?id=SuRdVgJR9F8C&rdid=book-SuRdVgJR9F8C&rdot=1&source=gbs_api", 
      "year": "2011-05-25",
    "quote_ids": [
      {
        "book_id": 55, 
        "quote_id": 4
      }
    ]
  }
	const instance = mount(<Router><BookItem item={book3}/> </Router>);
	expect(instance).not.toBeUndefined();
});

/* Author Instance Page Unit Tests. */
test("check Author Instance page not undefined", () => {
  const wrapper = shallow(<AuthorInstance />);
  expect(wrapper).not.toBeUndefined();
});

/* Author Instance page Loading Test */
test("checks if Loading page exists for author instance", () => {
  const wrapper = shallow(<AuthorInstance />);
  expect(wrapper.find("Loading").length).toEqual(1);
});

/* Book Instance Page Unit Tests. */
test("check Book Instance page not undefined", () => {
  const wrapper = shallow(<BookInstance />);
  expect(wrapper).not.toBeUndefined();
});

/* Books Instance page Loading Test */
test("checks if Loading page exists for book instance", () => {
  const wrapper = shallow(<BookInstance />);
  expect(wrapper.find("Loading").length).toEqual(1);
});

/* Quote Instance Page Unit Tests. */
test("check Quote Instance page not undefined", () => {
  const wrapper = shallow(<QuoteInstance />);
  expect(wrapper).not.toBeUndefined();
});

/* Quote Instance page Loading Test */
test("checks if Loading page exists for quote instance", () => {
  const wrapper = shallow(<QuoteInstance />);
  expect(wrapper.find("Loading").length).toEqual(1);
});
