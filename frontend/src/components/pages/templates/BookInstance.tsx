import React from "react";
import useAxios from "axios-hooks";
import Loading from "../../Loading";

function BookInstance() {
  const url = window.location.href;
  const split_url = url.split("/");
  const id = split_url[split_url.length - 1];
  const [{ data: book, loading }] = useAxios(`/api/book/${id}`);

  return loading ? (
    <Loading />
  ) : (
    <div className="d-flex flex-column align-items-center">
      <img className="p-2" src={book.image} alt="Book" />
      <h2 className="p-2">{book.name}</h2>
      <ul className="list-group">
        <li className="list-group-item">
          Author:{" "}
          {book.authors
            .map((author: any) => author.replace(/^'|'$/g, ""))
            .join(", ")}
        </li>
        <li className="list-group-item">
          Genre:{" "}
          {book.genres
            .map((genre: any) => genre.replace(/^'|'$/g, ""))
            .join(", ")}
        </li>
        <li className="list-group-item">Publishing Year: {book.year}</li>
        <li className="list-group-item">{book.description}</li>
        <li className="list-group-item">Page Count: {book.page_count}</li>
        <li className="list-group-item">
          Price: {book.price ? `$${book.price}` : "N/A"}
        </li>
      </ul>
      <br></br>
    </div>
  );
}

export default BookInstance;
