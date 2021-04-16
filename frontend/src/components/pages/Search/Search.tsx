import React, { useState } from "react";
import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  Index,
  SearchBox,
  Highlight,
  Pagination,
  connectHits,
  Snippet,
} from "react-instantsearch-dom";
import "instantsearch.css/themes/satellite.css";
import Placeholder from "../../media/placeholder.png";
import { Link } from "react-router-dom";

// My Algolia Account:
const mySearch = algoliasearch(
  "0R6QT9BHIM",
  "a6a3ab0dbac35b08cc1287f38c395079"
);

const bookHits = ({ hits }: any) => (
  <>
    {hits.map((hit: any) => (
      <div className="d-flex flex-row align-items-start mb-3">
        <img
          className="result-image"
          src={hit.image || Placeholder}
          alt={`Cover of ${hit.name}`}
        />
        <div className="d-flex flex-column">
          <Link to={`/book/${hit.book_id}`} className="result-link">
            <Highlight attribute="name" hit={hit} tagName="mark" />
          </Link>
          <Snippet attribute="description" hit={hit} tagName="mark" />
          <div>
            <b>Author(s):</b>{" "}
            <Highlight attribute="author_names" hit={hit} tagName="mark" />
          </div>
          <div>
            <b>Genres:</b>{" "}
            <Highlight attribute="genres" hit={hit} tagName="mark" />
          </div>
          <div className="d-flex flex-wrap">
            <div className="attr-item">
              <b>Published Date: </b>
              <Highlight attribute="year" hit={hit} tagName="mark" />
            </div>
            <div className="attr-item">
              <b>Page Count: </b>
              <Highlight attribute="page_count" hit={hit} tagName="mark" />
            </div>
          </div>
          <div className="d-flex flex-wrap">
            <div className="attr-item">
              <b>Average Rating: </b>
              {hit.avg_rating ? hit.avg_rating.toFixed(2) : "N/A"}
            </div>
            <div className="attr-item">
              <b>Price: </b>{" "}
              <Highlight attribute="price" hit={hit} tagName="mark" />
            </div>
          </div>
          <div className="d-flex flex-wrap">
            <div className="attr-item">
              <b>Language: </b>
              <Highlight attribute="language" hit={hit} tagName="mark" />
            </div>
            <div className="attr-item">
              <b>Maturity Rating: </b>
              {hit.maturity_rating === "MATURE" ? "Mature" : "Not Mature"}
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

const CustomBookHits = connectHits(bookHits);

const authorHits = ({ hits }: any) => (
  <>
    {hits.map((hit: any) => (
      <div className="d-flex flex-row align-items-start mb-3">
        <img
          className="result-image"
          src={hit.image}
          alt={`${hit.first_name} ${hit.last_name}`}
        />
        <div className="d-flex flex-column">
          <Link to={`/author/${hit.author_id}`} className="result-link">
            <Highlight attribute="first_name" hit={hit} tagName="mark" />{" "}
            <Highlight attribute="last_name" hit={hit} tagName="mark" />
          </Link>
          <Snippet attribute="spotlight" hit={hit} tagName="mark" />
          <div>
            <b>Genres:</b>{" "}
            <Highlight attribute="genres" hit={hit} tagName="mark" />
          </div>
          <div className="d-flex flex-wrap">
            <div className="attr-item">
              <b>Occupation: </b>
              <Highlight attribute="occupation" hit={hit} tagName="mark" />
            </div>
            <div className="attr-item">
              <b>Number of Published Books: </b>
              <Highlight
                attribute="num_published_books"
                hit={hit}
                tagName="mark"
              />
            </div>
          </div>
          <div className="d-flex flex-wrap">
            <div className="attr-item">
              <b>Average Rating: </b>
              {hit.avg_rating ? hit.avg_rating.toFixed(2) : "N/A"}
            </div>
            <div className="attr-item">
              <b>Gender: </b>{" "}
              <Highlight attribute="gender" hit={hit} tagName="mark" />
            </div>
          </div>
          <div className="d-flex flex-wrap">
            <div className="attr-item">
              <b>Has Bestsellers: </b>
              {hit.bestsellers ? "Yes" : "No"}
            </div>
            <div className="attr-item">
              <b>On Tour: </b>
              {hit.on_tour ? "Yes" : "No"}
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

const CustomAuthorHits = connectHits(authorHits);

const quoteHits = ({ hits }: any) => (
  <>
    {hits.map((hit: any) => (
      <div className="d-flex flex-row align-items-start mb-3">
        <div className="d-flex flex-column">
          <Link to={`/quote/${hit.quote_id}`} className="result-link">
            <Snippet attribute="quote" hit={hit} tagName="mark" />
          </Link>
          <div>
            <b>Author:</b>{" "}
            <Highlight attribute="author_name" hit={hit} tagName="mark" />
          </div>
          <div>
            <b>Tags:</b> <Highlight attribute="tags" hit={hit} tagName="mark" />
          </div>
          <div className="d-flex flex-wrap">
            <div className="attr-item">
              <b>Length: </b>
              <Highlight attribute="length" hit={hit} tagName="mark" />
            </div>
            <div className="attr-item">
              <b>Language: </b>
              <Highlight attribute="language" hit={hit} tagName="mark" />
            </div>
          </div>
          <div className="d-flex flex-wrap">
            <div className="attr-item">
              <b>Number of Unique Words: </b>
              <Highlight
                attribute="num_unique_words"
                hit={hit}
                tagName="mark"
              />
            </div>
            <div className="attr-item">
              <b>Number of Syllables: </b>{" "}
              <Highlight attribute="num_syllables" hit={hit} tagName="mark" />
            </div>
          </div>
          <div className="d-flex flex-wrap">
            <div className="attr-item">
              <b>Score: </b>
              <Highlight attribute="score" hit={hit} tagName="mark" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

const CustomQuoteHits = connectHits(quoteHits);

function Search(q: any) {
  const [bookPage, setBookPage] = useState(1);
  const [authorPage, setAuthorPage] = useState(1);
  const [quotePage, setQuotePage] = useState(1);
  return (
    <div className="container">
      <h1 className="mt-5">
        Search Results: <u>{q.q}</u>
      </h1>

      <InstantSearch
        indexName="books_search"
        searchClient={mySearch}
        searchState={{
          query: q.q,
        }}
        onSearchStateChange={(e) => {
          const indices = Object.keys(e.indices);
          if (indices.includes("books_search")) {
            setBookPage(e.indices.books_search.page);
          } else if (indices.includes("author_search")) {
            setAuthorPage(e.indices.author_search.page);
          } else {
            setQuotePage(e.indices.quote_search.page);
          }
        }}
      >
        {/*Hide searchbox on landing page */}
        <div style={{ display: "none" }}>
          <SearchBox />
        </div>
        {/*Books Results*/}
        {(q.model === "all" || q.model === "book") && (
          <Index indexName="books_search">
            <div>
              <h2 className="mt-4 mb-4">Book Results</h2>
              <CustomBookHits />
            </div>
            <Pagination defaultRefinement={bookPage} />
          </Index>
        )}

        {(q.model === "all" || q.model === "author") && (
          <Index indexName="author_search">
            <div>
              <h2 className="mt-4 mb-4">Author Results</h2>
              <CustomAuthorHits />
            </div>
            <Pagination defaultRefinement={authorPage} />
          </Index>
        )}

        {(q.model === "all" || q.model === "quote") && (
          <Index indexName="quote_search">
            <div>
              <h2 className="mt-4 mb-4">Quote Results</h2>
              <p className="score-text">
                A quote's score indicates the quote's NLP score, or the level of
                sentiment/emotional tone behind the words.
              </p>
              <CustomQuoteHits />
            </div>
            <Pagination defaultRefinement={quotePage} />
          </Index>
        )}
      </InstantSearch>
      <div className="mt-3 pb-3" style={{ color: "#5468ff" }}>
        <img
          src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/12_Algolia_logo_logos-512.png"
          alt="Algolia Logo"
          width={40}
          style={{ marginRight: 10 }}
        />
        Search powered by Algolia
      </div>
    </div>
  );
}

export default Search;
