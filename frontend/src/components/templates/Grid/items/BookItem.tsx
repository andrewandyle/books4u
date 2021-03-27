import React from "react";
import { Link } from "react-router-dom";
function BookItem({ item }: any) {
  const { id, authors, description, name, year, price, page_count } = item;
  return (
    <div className="p-2 col-lg-4 col-md-6">
      <div
        className="p-1 bg-light border border-dark rounded-lg container d-flex flex-column align-items-center"
        style={{ width: "75%", borderRadius: "0.3rem" }}
      >
        <h3>{name}</h3>
        <p style={{ textAlign: "center" }}>
          Author: {authors}
          <br></br>
          Year: {year}
          <br></br>
          Price: {price}
          <br></br>
          Page Count: {page_count}
          <br></br>
          Description: {description}
        </p>
        <Link to={`/book/${id}`} className="btn btn-primary">
          See More
        </Link>
      </div>
    </div>
  );
}

export default BookItem;
