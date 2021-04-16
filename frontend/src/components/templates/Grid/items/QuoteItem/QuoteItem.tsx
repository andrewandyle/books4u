import React from "react";
import { Link } from "react-router-dom";
import truncate from "truncate";
function QuoteItem({ item }: any) {
  const { quote_id, quote, author_name } = item;
  return (
    <Link to={`/quote/${quote_id}`} className="speech bubble">
      <h5>{truncate(quote, 250)}</h5>
      &ndash; {author_name}
    </Link>
  );
}

export default QuoteItem;
