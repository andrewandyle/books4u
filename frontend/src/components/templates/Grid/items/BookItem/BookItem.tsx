import React from "react";
import { Link } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import Placeholder from "./media/placeholder.png";

function BookItem({ item }: any) {
  const {
    id,
    name,
    authors,
    genres,
    year,
    page_count,
    avg_rating,
    num_ratings,
    image,
  } = item;
  const [isFlipped, setIsFlipped] = React.useState(false);
  return (
    <Link
      to={`/book/${id}`}
      className="p-2 col-lg-4 col-md-6"
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="flip-card d-flex flex-row align-items-center justify-content-start">
          <img
            className="image-container"
            src={image || Placeholder}
            alt={`Cover of ${name}`}
          ></img>
          <div className="main-details">
            <h4 className="title">{name}</h4>
            <div>
              by {authors[0].replace(/^'|'$/g, "")}
              {authors.length > 1 ? ` + ${authors.length - 1}` : ""}
              <br />
            </div>
          </div>
        </div>
        <div className="flip-card">
          <div className="back-details">
            Genre:{" "}
            {genres
              ? `${genres[0].replace(/^'|'$/g, "")}${
                  genres.length > 1 ? ` + ${genres.length - 1}` : ""
                }`
              : "N/A"}
            <br />
            Year: {year.substring(0, 4) || "N/A"}
            <br />
            Page Count: {page_count || "N/A"}
            <br />
            {avg_rating ? (
              <div>
                &#9733; {avg_rating} ({num_ratings})
              </div>
            ) : (
              <div>No rating data</div>
            )}
          </div>
        </div>
      </ReactCardFlip>
    </Link>
  );
}

export default BookItem;
