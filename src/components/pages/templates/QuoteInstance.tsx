import React, { useEffect, useState } from "react";
const quotes: Quote[] = [
    { id: "0", 
    text: "It does not do to dwell on dreams and forget to live.", 
    author: "J.K. Rowling", 
    length: "12",
    tags: "dreams, life",
    image: "https://books.google.com/books/content/images/frontcover/wrOQLV6xB-wC?fife=w200-h300"},

    { id: "1", 
    text: "So we beat on, boats against the current, borne back ceaselessly into the past.", 
    author: "F. Scott Fitzgerald", 
    length: "14",
    tags: "book, inspirational",
    image: "https://books.google.com/books/publisher/content/images/frontcover/sBoZEAAAQBAJ?fife=w200-h300"},

    { id: "2", 
    text: "And the little screaming fact that sounds through all history: repression works only to strengthen and knit the repressed.", 
    author: "John Steinbeck", 
    length: "19",
    tags: "repression, strength",
    image: "https://books.google.com/books/content/images/frontcover/ClXiwSYzjtYC?fife=w200-h300"},
];

interface Quote {
  id: string;
  text: string;
  author: string;
  length: string;
  tags: string;
  image: string;
}

function QuoteInstance() {
    const [quoteId, setQuoteId] = useState(0);
    useEffect(() => {
      const url = window.location.href;
      const split_url = url.split("/");
      const id = split_url[split_url.length - 1];
      setQuoteId(parseInt(id));
    }, []);
    return (
        <div className="d-flex flex-column align-items-center">
            <img className="p-2" src={quotes[quoteId].image} alt="Quote Image"/>
            <h4 className="p-2">"{quotes[quoteId].text}"</h4>
            <ul className="list-group">
                <li className="list-group-item">Author: {quotes[quoteId].author}</li>
                <li className="list-group-item">Length in Words: {quotes[quoteId].length}</li>
                <li className="list-group-item">Tags: {quotes[quoteId].tags}</li>
            </ul>     
        </div>
    );
}

export default QuoteInstance;
