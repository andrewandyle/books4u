import React from "react";
import Grid from "../../templates/Grid/Grid";
import BookItem from "../../templates/Grid/items/BookItem";

function Books() {
  const books = [
    { id: "1", title: "title1", author: "author1" },
    { id: "2", title: "title2", author: "author2" },
    { id: "3", title: "title3", author: "author3" },
  ];
  return (
    <div>
      <div className="container-fluid pt-4 pb-4">
      <div className="container">
        <h1 className="text-center">Books</h1>
        <hr />
        <p className = "text-center">
          Find information on your favorite books!
        </p>
      </div>
    </div>
      <Grid data={books} Component = {BookItem}></Grid>
    </div>
  );
}

export default Books;
