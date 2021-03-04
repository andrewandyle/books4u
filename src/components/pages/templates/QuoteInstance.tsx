import React, { useEffect, useState } from "react";
const quotes: Quote[] = [
    { id: "0", 
    text: "Be yourself; everyone else is already taken.", 
    author: "Oscar Wilde", 
    length: "7",
    tags: "attributed-no-source, be-yourself, honesty, inspirational, misattributed-oscar-wilde",
    image: "https://images.gr-assets.com/authors/1521044377p2/3565.jpg"},
    { id: "1", 
    text: "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.", 
    author: "Marilyn Monroe", 
    length: "41",
    tags: "attributed-no-source, best, life, love, mistakes, out-of-control, truth, worst",
    image: "https://images.gr-assets.com/quotes/1511992603p2/8630.jpg"},
    { id: "2", 
    text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", 
    author: "Albert Einstein", 
    length: "16",
    tags: "attributed-no-source, human-nature, humor, infinity, philosophy, science, stupidity, universe13",
    image: "https://images.gr-assets.com/authors/1429114964p2/9810.jpg"},
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
            <h4 className="p-2">{quotes[quoteId].text}</h4>
            <ul className="list-group">
                <li className="list-group-item">Author: {quotes[quoteId].author}</li>
                <li className="list-group-item">Length in Words: {quotes[quoteId].length}</li>
                <li className="list-group-item">Tags: {quotes[quoteId].tags}</li>
            </ul>     
        </div>
    );
}

export default QuoteInstance;
