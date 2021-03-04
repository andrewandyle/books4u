import React from "react";
import { Link } from "react-router-dom";
function BookItem({ item }: any) {
  const { id, title, author } = item;
  return (
    <div className = "p-2 col-lg-4 col-md-6">
      <div className = "p-1 bg-light border border-dark rounded-lg container d-flex flex-column align-items-center"
            style = {{width : "75%", borderRadius: "0.3rem"}}>
        <Link to={`/book/${id}`}>
          title: {title}
          <br></br>
        </Link>
        <p> author: {author}</p>
      </div>
    </div>
  );
}

export default BookItem;
