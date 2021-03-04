import React from "react";
import { Link } from "react-router-dom";
function QuoteItem({ item }: any) {
  const { id, quote, length } = item;
  return (
    <div className = "p-2 col-lg-4 col-md-6">
      <div className = "p-1 bg-light border border-dark rounded-lg container d-flex flex-column align-items-center"
            style = {{width : "75%", borderRadius: "0.3rem"}}>
      <Link to={`/quote/${id}`}>
        quote: {quote}
        <br></br>
      </Link>
      <p> length: {length}</p>
      </div>
    </div>
  );
}

export default QuoteItem;