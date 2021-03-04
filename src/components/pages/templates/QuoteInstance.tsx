import React, { useEffect, useState } from "react";
const quotes: Quote[] = [
  { id: "1", text: "This is a quotation", author: "Author1", length: "10" },
  { id: "2", text: "This is a quotation 2", author: "Author2", length: "20"},
  { id: "3", text: "This is a quotation 3", author: "Author3", length: "10"},
];

interface Quote {
  id: string;
  text: string;
  author: string;
  length: string;
}

function QuoteInstance() {
    const [quoteId, setQuoteId] = useState(0);
    useEffect(() => {
      const url = window.location.href;
      const split_url = url.split("/");
      const id = split_url[split_url.length - 1];
      setQuoteId(parseInt(id) - 1);
    }, []);
    return (
      <div className="d-flex flex-column align-items-center">
          <img className="p-2" src="../../../../src/logo.svg" alt="Quote Image"/>
          <h4 className="p-2">{quotes[quoteId].text}</h4>
          <p className="p-1">{quotes[quoteId].author}</p>
          <p className="p-1">{quotes[quoteId].length}</p>
          <p className="p-1">{quotes[quoteId].author}</p>
          <p className="p-1">{quotes[quoteId].author}</p>        
          <a href="#!" className="btn btn-primary">Link to Page?</a>
      </div>
    );
}

export default QuoteInstance;
