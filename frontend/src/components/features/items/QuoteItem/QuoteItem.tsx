import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import truncate from "truncate";

function QuoteItem({ item }: any) {
  const {
    quote_id,
    quote,
    author_name,
    length,
    num_unique_words,
    num_syllables,
    score,
  } = item;
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <Link
      to={`/quote/${quote_id}`}
      className="p-2 col-lg-4 col-md-6"
      style={{ textDecoration: "none", margin: "40px auto" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="speech bubble">
          <h5>{truncate(quote, 250)}</h5>
          &ndash; {author_name}
        </div>
        <div className="speech-back bubble quote-details">
          Length: {length}
          <br />
          Unique Words: {num_unique_words}
          <br />
          Syllables: {num_syllables}
          <br />
          Score: {score}
        </div>
      </ReactCardFlip>
    </Link>
  );
}

export default QuoteItem;
