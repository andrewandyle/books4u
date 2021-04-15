import React from "react";
import { Link } from "react-router-dom";
import useAxios from "axios-hooks";
import Loading from "../../features/Loading";
import BookItem from "../../templates/Grid/items/BookItem";

function QuoteInstance() {
  const url = window.location.href;
  const split_url = url.split("/");
  const id = split_url[split_url.length - 1];
  const [{ data, loading }] = useAxios(`/api/quote/${id}`);

  return loading ? (
    <Loading />
  ) : (
    <div className="d-flex flex-column align-items-center">
      <div className="author-header">
        <div className="container d-flex flex-row align-items-center mt-5 mb-3">
          {data.related_author.image && (
            <img
              src={data.related_author.image}
              alt="Author"
              style={{ marginRight: 15 }}
            />
          )}
          <div>
            <h1>"{data.quote.quote}"</h1>
            <Link
              to={`/author/${data.quote.author}`}
              style={{ color: "white" }}
            >
              <h3>&ndash; {data.quote.author_name}</h3>
            </Link>
          </div>
        </div>
        {data.quote.tags && (
          <div className="container d-flex flex-row flex-wrap align-items-center justify-content-start mb-3">
            <u>
              <b>Tags:</b>
            </u>
            {data.quote.tags.map((tag: any) => (
              <div className="chip">{tag}</div>
            ))}
          </div>
        )}
        {data.quote.most_common_words && (
          <div className="container mb-3">
            <u>
              <b>Most Common Words:</b>
            </u>{" "}
            {data.quote.most_common_words.join(", ")}
          </div>
        )}
        {data.quote.least_common_words && (
          <div className="container mb-3">
            <u>
              <b>Least Common Words:</b>
            </u>{" "}
            {data.quote.least_common_words.join(", ")}
          </div>
        )}
        <div className="container">
          <div className="row mb-3">
            <div className="col-sm">
              <u>
                <b>Quote Length:</b>
              </u>{" "}
              {data.quote.length}
            </div>
            <div className="col-sm">
              <u>
                <b>Language:</b>
              </u>{" "}
              {data.quote.language.toUpperCase()}
            </div>
            <div className="col-sm">
              <u>
                <b>Score*:</b>
              </u>{" "}
              {data.quote.score}
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <u>
                <b>Number of Unique Words:</b>
              </u>{" "}
              {data.quote.num_unique_words}
            </div>
            <div className="col-sm">
              <u>
                <b>Number of Syllables:</b>
              </u>{" "}
              {data.quote.num_syllables}
            </div>
            <div className="col-sm d-flex"></div>
          </div>
          <p className="mt-3" style={{ fontSize: 14 }}>
            * A quote's score indicates the quote's NLP score, or the level of
            sentiment/emotional tone behind the words.
          </p>
        </div>
      </div>

      {data.quote.link && (
        <a
          className="btn btn-primary btn-lg mb-5"
          href={data.quote.link}
          target="_blank"
          rel="noreferrer"
        >
          Link to the quote!
        </a>
      )}

      <div className="container d-flex flex-column align-items-center">
        <h1>{data.quote.author_name}'s Books</h1>
        <div
          className="d-flex flex-row pt-4 pb-5 justify-content-center flex-wrap"
          style={{ width: "100%" }}
        >
          {data.related_books.map((book: any) => (
            <BookItem item={book} excludeAuthor />
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuoteInstance;
