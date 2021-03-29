import React from "react";
import { Link } from "react-router-dom";
function QuoteItem({ item }: any) {
  const { id, quote, author } = item;
  return (
    <Link to={`/quote/${id}`} className="speech bubble">
      <h3>{quote}</h3>
      &ndash; {author}
    </Link>
  );
}

export default QuoteItem;
