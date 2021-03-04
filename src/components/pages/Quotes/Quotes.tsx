import React from "react";
import Grid from "../../templates/Grid/Grid";
import QuoteItem from "../../templates/Grid/items/QuoteItem";

function Quotes() {
  const quotes = [
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

  return (
    <div>
        <div className="container-fluid pt-4 pb-4">
          <div className="container">
              <h1 className="text-center">Quotes</h1>
              <hr />
              <p className = "text-center">
                Find information on quotes!
              </p>
          </div>
       </div>
       <Grid data={quotes} Component = {QuoteItem}></Grid>
    </div>
  );
}

export default Quotes;
