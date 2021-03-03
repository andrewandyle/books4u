import React from "react";
import { Link } from "react-router-dom";
function BookItem( { item } : any ) {
const {id, title, author} = item
  return (
    <Link to={`/book/${id}`}>
        title: {title}
        <br></br>
        author: {author}
    </Link>
  );
}

export default BookItem;
