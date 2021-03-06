import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import Placeholder from "../../../media/placeholder.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function BookItem({ item }: any) {
  const {
    book_id,
    name,
    author_names,
    genres,
    year,
    page_count,
    avg_rating,
    num_ratings,
    image,
  } = item;
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <Link
      to={`/book/${book_id}`}
      className="p-2 col-lg-4 col-md-6"
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="book-card d-flex flex-row align-items-center justify-content-start">
          <img
            className="image-container"
            src={image || Placeholder}
            alt={`Cover of ${name}`}
          ></img>
          <div className="main-details">
            <h4 className="title">{name}</h4>
            <div>
              by {author_names[0]}
              {author_names.length > 1 ? ` + ${author_names.length - 1}` : ""}
              <br />
            </div>
          </div>
        </div>
        <div className="book-card back-details">
          Genre:{" "}
          {genres
            ? `${genres[0]}${
                genres.length > 1 ? ` + ${genres.length - 1}` : ""
              }`
            : "N/A"}
          <br />
          Year: {year ? year.substring(0, 4) : "N/A"}
          <br />
          Page Count: {page_count || "N/A"}
          <br />
          {avg_rating ? (
            <div>
              <FontAwesomeIcon icon={faStar} /> {avg_rating} ({num_ratings})
            </div>
          ) : (
            <div>No rating data</div>
          )}
        </div>
      </ReactCardFlip>
    </Link>
  );
}

export default BookItem;
