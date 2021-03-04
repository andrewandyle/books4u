import React, { useEffect, useState } from "react";
const books: Book[] = [
    { id: "0", 
    image: "http://books.google.com/books/content?id=_oG_iTxP1pIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", 
    author: "Daniel Keyes",
    title: "Flowers for Algernon",
    genre: "Fiction",
    year: "2007",
    description: "Oscar-winning film Charly starring Cliff Robertson and Claire Bloom-a mentally challenged man receives an operation that turns him into a genius...and introduces him to heartache.",
    pageCount: "304",
    price: "8.99",
    buyLink: "https://play.google.com/store/books/details?id=_oG_iTxP1pIC&rdid=book-_oG_iTxP1pIC&rdot=1&source=gbs_api"},

    { id: "1", 
    image: "http://books.google.com/books/content?id=usvqAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api", 
    author: "Detroit Institute of Arts; George S. Keyes; Susan Donahue Kuretsky; Axel Rüger; Arthur K. Wheelock",
    title: "Masters of Dutch Painting",
    genre: "Art",
    year: "2004",
    description: "A comprehensive study of Dutch Art, from one of the world's premier collections.",
    pageCount: "288",
    price: "Not For Sale",
    buyLink: "",},

    { id: "2", 
    image: "http://books.google.com/books/content?id=jQxIAQAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", 
    author: "Angela Mary Keyes",
    title: "The Five Senses",
    genre: "Senses and sensation",
    year: "1911",
    description: "No description found",
    pageCount: "252",
    price: "Not For Sale",
    buyLink: "",}
];

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
    const [bookId, setBookId] = useState(0);
    useEffect(() => {
        const url = window.location.href;
        const split_url = url.split("/");
        const id = split_url[split_url.length - 1];
        setBookId(parseInt(id));
    }, []);
    return (
    <div className="d-flex flex-column align-items-center">
        <img className="p-2" src={books[bookId].image} alt="Book Image"/>
        <h2 className="p-2">{books[bookId].title}</h2>
        <ul className="list-group">
            <li className="list-group-item">Author: {books[bookId].author}</li>
            <li className="list-group-item">Genre: {books[bookId].genre}</li>
            <li className="list-group-item">Publishing Year: {books[bookId].year}</li>
            <li className="list-group-item">{books[bookId].description}</li>
            <li className="list-group-item">Page Count: {books[bookId].pageCount}</li>
            <li className="list-group-item">Price: ${books[bookId].price}</li>
            <li className="list-group-item">{books[bookId].year}</li>
        </ul>
        <a href={books[bookId].buyLink} className="btn btn-primary">Buy</a>
    </div>
  );
}

export default BookInstance;
