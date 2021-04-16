import algoliasearch from "algoliasearch";
import {
  InstantSearch,
  Index,
  SearchBox,
  Hits,
  Highlight,
  Configure,
  Pagination,
  ClearRefinements,
  RefinementList,
  connectHits,
  Snippet,
  connectStateResults,
} from "react-instantsearch-dom";
import "instantsearch.css/themes/satellite.css";
import { Link } from "react-router-dom";
import { htmlToText } from "html-to-text";
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
    if (i == genre.length - 1) {
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
              {Math.round(hit.avg_rating * 100) / 100}
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
  return (
    <div className="container">
      <h1>Search Results: {q.q}</h1>

      <InstantSearch
        indexName="books_search"
        searchClient={mySearch}
        searchState={{
          query: q.q,
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
            <Pagination />
          </Index>
        )}

        {(q.model === "all" || q.model === "author") && (
          <Index indexName="author_search">
            <div>
              <h1>Author Results</h1>
              <CustomAuthorHits />
            </div>
            <Pagination />
          </Index>
        )}

        {(q.model === "all" || q.model === "quote") && (
          <Index indexName="quote_search">
            <div>
              <h1>Quote Results</h1>
              <CustomQuoteHits />
            </div>
            <Pagination />
          </Index>
        )}
      </InstantSearch>
    </div>
  );
}

export default Search;
