import React from "react";
import useAxios from "axios-hooks";
import Loading from "../../features/Loading";
import BookItem from "../../features/items/BookItem";
import QuoteItem from "../../features/items/QuoteItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCheck,
  faTimes,
  faMars,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";

function AuthorInstance() {
  const url = window.location.href;
  const split_url = url.split("/");
  const id = split_url[split_url.length - 1];
  const [{ data, loading }] = useAxios(`/api/author/${id}`);

  return loading ? (
    <Loading />
  ) : (
    <div className="d-flex flex-column align-items-center">
      <div className="author-header">
        <div className="container d-flex flex-row align-items-center mt-5 mb-3">
          {data.author.image && (
            <img
              src={data.author.image}
              alt="Book"
              style={{ marginRight: 15 }}
            />
          )}
          <div>
            <h1>
              {data.author.first_name} {data.author.last_name}
            </h1>
            <div
              dangerouslySetInnerHTML={{ __html: data.author.spotlight }}
            ></div>
          </div>
        </div>
        {data.author.genres && (
          <div className="container d-flex flex-row flex-wrap align-items-center justify-content-start mb-3">
            <u>
              <b>Genres:</b>
            </u>
            {data.author.genres.map((genre: any) => (
              <div className="chip">{genre}</div>
            ))}
          </div>
        )}
        <div className="container">
          <div className="row mb-3">
            <div className="col-sm d-flex">
              <u>
                <b>On Tour:</b>
              </u>
              {data.author.on_tour ? (
                <div>
                  <FontAwesomeIcon icon={faCheck} style={{ marginLeft: 5 }} />{" "}
                  Yes
                </div>
              ) : (
                <div>
                  <FontAwesomeIcon icon={faTimes} style={{ marginLeft: 5 }} />{" "}
                  No
                </div>
              )}
            </div>
            <div className="col-sm d-flex">
              <u>
                <b>Has Bestsellers:</b>
              </u>
              {data.author.bestsellers ? (
                <div>
                  <FontAwesomeIcon icon={faCheck} style={{ marginLeft: 5 }} />{" "}
                  Yes
                </div>
              ) : (
                <div>
                  <FontAwesomeIcon icon={faTimes} style={{ marginLeft: 5 }} />{" "}
                  No
                </div>
              )}
            </div>
            <div className="col-sm">
              <u>
                <b>Occupation:</b>
              </u>{" "}
              {data.author.occupation || "N/A"}
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <u>
                <b>Number of Published Books:</b>
              </u>{" "}
              {data.author.num_published_books || "N/A"}
            </div>
            <div className="col-sm d-flex">
              <u>
                <b>Average Rating:</b>
              </u>{" "}
              {data.author.avg_rating ? (
                <div>
                  <FontAwesomeIcon icon={faStar} style={{ marginLeft: 5 }} />{" "}
                  {data.author.avg_rating.toFixed(2)}
                </div>
              ) : (
                <div>N/A</div>
              )}
            </div>
            <div className="col-sm d-flex">
              <u>
                <b>Gender:</b>
              </u>{" "}
              {data.author.gender === "M" ? (
                <div>
                  <FontAwesomeIcon icon={faMars} style={{ marginLeft: 5 }} />{" "}
                  Male
                </div>
              ) : (
                <div>
                  <FontAwesomeIcon icon={faVenus} style={{ marginLeft: 5 }} />{" "}
                  Female
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container d-flex flex-column align-items-center">
        <h1>
          {data.author.first_name} {data.author.last_name}'s Books
        </h1>
        <div
          className="d-flex flex-row pt-4 pb-5 justify-content-center flex-wrap"
          style={{ width: "100%" }}
        >
          {data.related_books.map((book: any) => (
            <BookItem item={book} />
          ))}
        </div>
        <h1>
          {data.author.first_name} {data.author.last_name}'s Quotes
        </h1>
        <div
          className="d-flex flex-row flex-wrap pt-3 pb-5 align-items-center"
          style={{ width: "100%" }}
        >
          {data.related_quotes.map((quote: any) => (
            <QuoteItem item={quote} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuthorInstance;
