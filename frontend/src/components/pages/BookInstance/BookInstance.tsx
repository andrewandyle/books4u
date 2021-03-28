import React from "react";
import { Link } from "react-router-dom";
import useAxios from "axios-hooks";
import Loading from "../../features/Loading";
import QuoteItem from "../../templates/Grid/items/QuoteItem";

function BookInstance() {
  const url = window.location.href;
  const split_url = url.split("/");
  const id = split_url[split_url.length - 1];
  const [{ data, loading }] = useAxios(`/api/book/${id}`);
  const [{ data: authorData, loading: authorLoading }] = useAxios(
    "/api/authors"
  );
  const [{ data: quoteData, loading: quoteLoading }] = useAxios("/api/quotes");

  console.log(authorData)

  const getListOfAuthorIds = () =>
    data.author_ids.map((author_obj: any) => author_obj.author_id);

  const getListOfQuoteIds = () =>
    data.quote_ids.map((quote_obj: any) => quote_obj.quote_id);

  return loading ? (
    <Loading />
  ) : (
    <div className="d-flex flex-column align-items-center">
      {data.book.image && (
        <img className="p-2" src={data.book.image} alt="Book" />
      )}
      <h2 className="p-2">{data.book.name}</h2>
      <ul className="list-group">
        <li className="list-group-item">
          {data.book.authors.length > 1 ? "Authors" : "Author"}:{" "}
          {data.book.authors
            .map((author: any) => author.replace(/^'|'$/g, ""))
            .join(", ")}
        </li>
        <li className="list-group-item">
          Genre:{" "}
          {data.book.genres
            ? data.book.genres
                .map((genre: any) => genre.replace(/^'|'$/g, ""))
                .join(", ")
            : "N/A"}
        </li>
        <li className="list-group-item">Publishing Year: {data.book.year}</li>
        <li className="list-group-item">{data.book.description}</li>
        <li className="list-group-item">Page Count: {data.book.page_count}</li>
        <li className="list-group-item">
          Price: {data.book.price ? `$${data.book.price}` : "N/A"}
        </li>
      </ul>
      <h2>Author Pages</h2>
      {authorLoading ? (
        <Loading />
      ) : (
        <div className="row d-flex flex-row py-5" style={{ width: "100%" }}>
          {authorData.authors
            .filter((author: any) => getListOfAuthorIds().includes(author.id))
            .map((author: any) => (
              <div className="p-1 bg-light border border-dark rounded-lg container d-flex flex-column align-items-center">
                <Link to={`/author/${author.id}`}>{author.first_name} {author.last_name}</Link>
              </div>
            ))}
        </div>
      )}
      <h2>Quotes From the Authors</h2>
      {quoteLoading ? (
        <Loading />
      ) : (
        <div className="row d-flex flex-row py-5" style={{ width: "100%" }}>
          {quoteData.quotes
            .filter((quote: any) => getListOfQuoteIds().includes(quote.id))
            .map((quote: any) => (
              <QuoteItem item={quote} includeAuthor />
            ))}
        </div>
      )}
    </div>
  );
}

export default BookInstance;
