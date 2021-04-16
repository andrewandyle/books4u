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
import { Link } from "react-router-dom";
import "./Search.css";
// My Algolia Account:
const mySearch = algoliasearch(
  "0R6QT9BHIM",
  "a6a3ab0dbac35b08cc1287f38c395079"
);

const bookHits = ({ hits }: any) => (
  <ol>
    {hits.map((hit: any) => (
      <div>
        {hit.name}
        {hit.author_names}
        {hit.genres}
      </div>
    ))}
  </ol>
);

function displayGenres(genre: any) {
  if (genre == null) {
    return "N/A";
  }
  var i = 0;
  var ret = "";
  for (i = 0; i < genre.length; i++) {
    ret += genre[i];
    if (i === genre.length - 1) {
      break;
    }
    ret += ", ";
  }

  return ret;
}
const CustomBookHits = connectHits(bookHits);

const authorHits = ({ hits }: any) => (
  <ol>
    {hits.map((hit: any) => (
      <div className="d-flex flex-row">
        <img src={hit.image} alt="book" width={50}></img>
        <div>
          <Link to={`/author/${hit.author_id}`}>
            <Highlight attribute="first_name" hit={hit} tagName="mark" />{" "}
            <Highlight attribute="last_name" hit={hit} tagName="mark" />
          </Link>
          <div>
            <Snippet attribute="spotlight" hit={hit} tagName="mark" />
            <br />
            Genres: {displayGenres(hit.genres)}
            <div>
              <strong>Rating: </strong>
              {hit.avg_rating ? hit.avg_rating.toFixed(2) : 'N/A'}
              <strong> Gender: </strong> {hit.gender}
              <strong> Occupation: </strong>
              {hit.occupation}
              <strong>Number of Published Books: </strong>
              {hit.num_published_books}
            </div>
          </div>
        </div>
      </div>
    ))}
  </ol>
);

const CustomAuthorHits = connectHits(authorHits);

const quoteHits = ({ hits }: any) => (
  <ol>
    {hits.map((hit: any) => (
      <div>
        {hit.author_name}
        {hit.language}
        {hit.tags}
      </div>
    ))}
  </ol>
);

const CustomQuoteHits = connectHits(quoteHits);

function Search(q: any) {
  const [bookPage, setBookPage] = useState(1);
  const [authorPage, setAuthorPage] = useState(1);
  const [quotePage, setQuotePage] = useState(1);
  return (
    <div className="container">
      <h1>Search Results: {q.q}</h1>

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
              <h1>Books Results</h1>
              <CustomBookHits />
            </div>
            <Pagination defaultRefinement={bookPage} />
          </Index>
        )}

        {(q.model === "all" || q.model === "author") && (
          <Index indexName="author_search">
            <div>
              <h1>Author Results</h1>
              <CustomAuthorHits />
            </div>
            <Pagination defaultRefinement={authorPage} />
          </Index>
        )}

        {(q.model === "all" || q.model === "quote") && (
          <Index indexName="quote_search">
            <div>
              <h1>Quote Results</h1>
              <CustomQuoteHits />
            </div>
            <Pagination defaultRefinement={quotePage} />
          </Index>
        )}
      </InstantSearch>
    </div>
  );
}

export default Search;
