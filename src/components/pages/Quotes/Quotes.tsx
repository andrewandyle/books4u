import React from "react";
import Grid from "../../templates/Grid/Grid";
import QuoteItem from "../../templates/Grid/items/QuoteItem";

function Quotes() {
  const quotes = [
    { id: "1", quote: "quote1", length: "length1" },
    { id: "2", quote: "quote2", length: "length2" },
    { id: "3", quote: "quote3", length: "length3" },
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
