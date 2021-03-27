import React from "react";
import Grid from "../../templates/Grid/Grid";
import QuoteItem from "../../templates/Grid/items/QuoteItem";
import Pagination from '../../templates/Pagination';
import useAxios from 'axios-hooks';

function Quotes() {
  // const state = { allQuotes: [], currQuotes: [], currPage: null, totalPages: null }
  // const [{ data: allQuotes }] = useAxios("/api/books");
  // this.setState({ allq });
  // console.log(allQuotes)
  const quotes = [
    {
      id: "0",
      text: "It does not do to dwell on dreams and forget to live.",
      author: "J.K. Rowling",
      length: "12",
      tags: "dreams, life",
      image:
        "https://books.google.com/books/content/images/frontcover/wrOQLV6xB-wC?fife=w200-h300",
      work: "Harry Potter and the the Sorcer's Stone",
    },

    {
      id: "1",
      text:
        "So we beat on, boats against the current, borne back ceaselessly into the past.",
      author: "F. Scott Fitzgerald",
      length: "14",
      tags: "book, inspirational",
      image:
        "https://books.google.com/books/publisher/content/images/frontcover/sBoZEAAAQBAJ?fife=w200-h300",
      work: "The Great Gatsby",
    },

    {
      id: "2",
      text:
        "And the little screaming fact that sounds through all history: repression works only to strengthen and knit the repressed.",
      author: "John Steinbeck",
      length: "19",
      tags: "repression, strength",
      image:
        "https://books.google.com/books/content/images/frontcover/ClXiwSYzjtYC?fife=w200-h300",
      work: "The Grapes of Wrath",
    },
  ];

  return (
    <div>
      <div className="container-fluid pt-4 pb-4">
        <div className="container">
          <h1 className="text-center">Quotes</h1>
          <hr />
          <p className="text-center">Find information on quotes!</p>
        </div>
      </div>
      <Grid data={quotes} Component={QuoteItem}></Grid>
    </div>
  );
}

export default Quotes;
