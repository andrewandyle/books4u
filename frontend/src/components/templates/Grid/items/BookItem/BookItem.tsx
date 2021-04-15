import React from "react";
import { Link } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import Placeholder from "./media/placeholder.png";
import Highlighter from "react-highlight-words";

function BookItem(props : any) {
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
  } = props.item;
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <Link
      to={`/book/${book_id}`}
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
            <h4 className="title">
              <Highlighter
                highlightClassName="highlight-class"
                searchWords={[props.searchedTerm]}
                textToHighlight={name + ""}
              />
            </h4>
              
            <div>
            <Highlighter
                highlightClassName="highlight-class"
                searchWords={[props.searchedTerm]}
                textToHighlight={"by " + author_names[0] + ""}
              />
              by {author_names[0]}
              {author_names.length > 1 ? ` + ${author_names.length - 1}` : ""}
              <br />
            </div>
          </div>
        </div>
        <div className="flip-card">
          <div className="back-details">
            Genre:{" "}
            {genres?
              genres.length >= 1 ? (
              <Highlighter
                highlightClassName="highlight-class"
                searchWords={[props.searchedTerm]}
                textToHighlight={genres[0] + ""}
              />):"" : "N/A"
            }
            {/* {genres
              ? `${genres[0]}${
                  genres.length > 1 ? ` + ${genres.length - 1}` : ""
                }`
              : "N/A"} */}
            <br />
            Year: {year ? <Highlighter
                highlightClassName="highlight-class"
                searchWords={[props.searchedTerm]}
                textToHighlight={year.substring(0, 4) + ""}
              />
             : "N/A"}
            <br />
            Page Count: {
              <Highlighter
              highlightClassName="highlight-class"
              searchWords={[props.searchedTerm]}
              textToHighlight={page_count + ""}
            /> || "N/A"}
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
