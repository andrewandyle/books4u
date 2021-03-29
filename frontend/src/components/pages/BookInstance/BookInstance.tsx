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

  const getListOfAuthorIds = () =>
    data.author_ids.map((author_obj: any) => author_obj.author_id);

  const getListOfQuoteIds = () =>
    data.quote_ids.map((quote_obj: any) => quote_obj.quote_id);

  return loading ? (
    <Loading />
  ) : (
    <div className="d-flex flex-column align-items-center">
      <div className="book-header">
        <div className="container d-flex flex-row align-items-center mt-5 mb-3">
          {data.book.image && (
            <img src={data.book.image} alt="Book" style={{ marginRight: 15 }} />
          )}
          <div>
            <h1>{data.book.name}</h1>
            <h3>
              by{" "}
              {data.book.authors
                .map((author: any) => author.replace(/^'|'$/g, ""))
                .join(", ")}
            </h3>
            {data.book.description}
          </div>
        </div>
        {data.book.genres && (
          <div className="container d-flex flex-row align-items-center justify-content-start mb-3">
            <u>
              <b>Genres:</b>
            </u>
            {data.book.genres.map((genre: any) => (
              <div className="chip">{genre.replace(/^'|'$/g, "")}</div>
            ))}
          </div>
        )}
        <div className="container">
          <div className="row mb-3">
            <div className="col-sm d-flex">
              <u>
                <b>Rating:</b>
              </u>
              {data.book.avg_rating ? (
                <div>
                  &#9733; {data.book.avg_rating} ({data.book.num_ratings})
                </div>
              ) : (
                <div>N/A</div>
              )}
            </div>
            <div className="col-sm">
              <u>
                <b>Page Count:</b>
              </u>{" "}
              {data.book.page_count || "N/A"}
            </div>
            <div className="col-sm">
              <u>
                <b>Published Date:</b>
              </u>{" "}
              {data.book.year || "N/A"}
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <u>
                <b>Language:</b>
              </u>{" "}
              {data.book.language.toUpperCase()}
            </div>
            <div className="col-sm">
              <u>
                <b>Maturity:</b>
              </u>{" "}
              {data.book.maturity_rating === "NOT_MATURE"
                ? "Not Mature"
                : "Mature"}
            </div>
            <div className="col-sm">
              <u>
                <b>Price:</b>
              </u>{" "}
              {data.book.price ? `$${data.book.price}` : "N/A"}
            </div>
          </div>
        </div>
      </div>

      {data.book.purchase_link && (
        <a
          className="btn btn-primary btn-lg mb-5"
          href={data.book.purchase_link}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/buy-512.png"
            alt="Buy"
            width={40}
            style={{ filter: "invert()", marginRight: 10 }}
          />
          Click here to purchase!
        </a>
      )}

      <div className="container d-flex flex-column align-items-center">
        <h1>Author Pages</h1>
        {authorLoading ? (
          <Loading />
        ) : (
          <div
            className="row d-flex flex-row pt-4 pb-5 justify-content-center flex-wrap"
            style={{ width: "100%" }}
          >
            {authorData.authors
              .filter((author: any) => getListOfAuthorIds().includes(author.id))
              .map((author: any) => (
                <Link className="author-link" to={`/author/${author.id}`}>
                  <img
                    src={author.image}
                    alt={`${author.first_name} ${author.last_name}`}
                  />
                  {author.first_name} {author.last_name}
                </Link>
              ))}
          </div>
        )}
        <h1>Quotes From the Authors</h1>
        {quoteLoading ? (
          <Loading />
        ) : (
          <div className="row d-flex flex-row pt-3 pb-5" style={{ width: "100%" }}>
            {quoteData.quotes
              .filter((quote: any) => getListOfQuoteIds().includes(quote.id))
              .map((quote: any) => (
                <QuoteItem item={quote} includeAuthor />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookInstance;
