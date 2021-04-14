import React from "react";
import { Link } from "react-router-dom";
function QuoteItem({ item }: any) {
  const { quote_id, quote, author_name } = item;
  return (
    <Link to={`/quote/${quote_id}`} className="speech bubble">
      <h3>{quote}</h3>
      &ndash; {author_name}
    </Link>
  );
}

export default QuoteItem;
