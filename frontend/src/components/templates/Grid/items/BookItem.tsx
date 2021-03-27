import React from "react";
import { Link } from "react-router-dom";
function BookItem({ item, excludeAuthor }: any) {
  const { id, authors, name, year, price, page_count, image } = item;
  return (
    <div className="p-2 col-lg-4 col-md-6">
      <div
        className="p-1 bg-light border border-dark rounded-lg container d-flex flex-column align-items-center"
        style={{ width: "75%", borderRadius: "0.3rem" }}
      >
        {image && <img src={image} alt={`Cover of ${name}`}></img>}
        <h3>{name}</h3>
        <p style={{ textAlign: "center" }}>
          {!excludeAuthor && (
            <div>
              Author:{" "}
              {authors
                .map((author: any) => author.replace(/^'|'$/g, ""))
                .join(", ")}
              <br />
            </div>
          )}
          Year: {year ? year.substring(0, 4) : "N/A"}
          <br />
          Price: {price ? `$${price}` : "N/A"}
          <br />
          Page Count: {page_count}
        </p>
        <Link to={`/book/${id}`} className="btn btn-primary">
          See More
        </Link>
      </div>
    </div>
  );
}

export default BookItem;
