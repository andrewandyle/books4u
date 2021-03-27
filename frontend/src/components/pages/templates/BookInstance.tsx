import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from 'axios-hooks';


interface Book {
  id: string;
  image: string;
  author: string;
  title: string;
  genre: string;
  year: string;
  description: string;
  pageCount: string;
  price: string;
  buyLink: string;
}

function BookInstance() {
  /*Axios is just here to compile. */
  const [{ data: books }] = useAxios("/api/books");
  const [bookId, setBookId] = useState(0);
  useEffect(() => {
    const url = window.location.href;
    const split_url = url.split("/");
    const id = split_url[split_url.length - 1];
    setBookId(parseInt(id));
  }, []);
  return (
    <div className="d-flex flex-column align-items-center">
      <img className="p-2" src={books[bookId].image} alt="Book" />
      <h2 className="p-2">{books[bookId].title}</h2>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to={`/author/${bookId}`}> Author: {books[bookId].author}</Link>
        </li>
        <li className="list-group-item">Genre: {books[bookId].genre}</li>
        <li className="list-group-item">
          Publishing Year: {books[bookId].year}
        </li>
        <li className="list-group-item">{books[bookId].description}</li>
        <li className="list-group-item">
          Page Count: {books[bookId].pageCount}
        </li>
        <li className="list-group-item">Price: ${books[bookId].price}</li>
        <li className="list-group-item">{books[bookId].year}</li>
      </ul>
      <br></br>
      <Link to={`/quote/${bookId}`} className="btn btn-primary">
        Look at a Quote from this Book!
      </Link>
    </div>
  );
}

export default BookInstance;
