import React from "react";
import { Link } from "react-router-dom";
import useAxios from "axios-hooks";
import Loading from "../../Loading";

function QuoteInstance() {
  const url = window.location.href;
  const split_url = url.split("/");
  const id = split_url[split_url.length - 1];
  const [{ data: quote, loading }] = useAxios(`/api/quote/${id}`);

  return loading ? (
    <Loading />
  ) : (
    <div className="container d-flex flex-column align-items-center">
      <h4 className="p-2">"{quote.quote}"</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to={`/author/${quote.author_id}`}>Author: {quote.author}</Link>
        </li>
        <li className="list-group-item">Length in Words: {quote.length}</li>
        <li className="list-group-item">Tags: {quote.tags.join(", ")}</li>
      </ul>
    </div>
  );
}

export default QuoteInstance;
