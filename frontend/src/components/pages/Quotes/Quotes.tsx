import React, { useState, useEffect, useRef, createContext } from "react";
import QuoteItem from "../../features/items/QuoteItem";
import Loading from "../../features/Loading";
import useAxios from "axios-hooks";
import Pagination from "@material-ui/lab/Pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import QuoteIcon from "../../media/quote.png";

import Select from "react-select";
import SortButton from "../../features/filters/SortButton";
import FilterButton from "../../features/filters/FilterButton";

const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "pt", label: "Portuguese" },
  { value: "de", label: "German" },
  { value: "pl", label: "Polish" },
  { value: "bs", label: "Bosnian" },
];

export interface QuoteFilters {
  language?: string;
  length?: string;
  num_unique_words?: string;
  num_syllables?: string;
  score?: string;
  sort_by?: string;
}

interface QuoteContextObject {
  quoteFilters: QuoteFilters;
  setQuoteFilters: Function;
}

export const QuoteFiltersContext = createContext<QuoteContextObject>({
  quoteFilters: {},
  setQuoteFilters: (value: any) => {},
});

function Quotes() {
  const searchText: any = useRef();
  const numPerPage = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedData, setDisplayedData] = useState([]);
  const [activeFilters, setActiveFilters] = useState<QuoteFilters>({});
  const [{ data, loading }] = useAxios({
    url: "/api/quotes",
    params: { ...activeFilters },
  });

  useEffect(() => {
    if (data && data.quotes) {
      setCurrentPage(1);
      setDisplayedData(data.quotes.slice(0, numPerPage));
    }
  }, [data]);

  const onPageChange = (pageNumber: number) => {
    const zeroIndexedPage = pageNumber - 1;
    setDisplayedData(
      data.quotes.slice(
        zeroIndexedPage * numPerPage,
        zeroIndexedPage * numPerPage + numPerPage
      )
    );
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const searchQuotes = () => {
    window.location.assign(`/search/q=${searchText.current.value}/model=quote`);
  };

  return (
    <div className="container">
      <div className="mb-5 mt-5 d-flex flex-row flex-wrap justify-content-between">
        <div className="d-flex align-items-center">
          <img
            src={QuoteIcon}
            alt="Author"
            width={40}
            style={{ marginRight: 10 }}
          />
          <h2>Discover Quotes</h2>
        </div>
        <div className="search-margin input-group">
          <div className="form-outline" id="authors-search">
            <input
              type="search"
              ref={searchText}
              className="form-control"
              placeholder="Search quotes..."
              onKeyPress={(event: any) => {
                if (event.key === "Enter") {
                  searchQuotes();
                }
              }}
            />
          </div>
          <button className="btn btn-primary" onClick={() => searchQuotes()}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      <QuoteFiltersContext.Provider
        value={{
          quoteFilters: activeFilters,
          setQuoteFilters: setActiveFilters,
        }}
      >
        <div className="filters">
          <div className="filter-block d-flex flex-row align-items-center mb-2">
            <h4>Quote Text</h4>
            <SortButton quotes field="quote" />
          </div>
          <div className="filter-block d-flex flex-row align-items-center mb-2">
            <h4>Language</h4>
            <Select
              className="dropdown"
              options={languageOptions}
              placeholder="Choose languages..."
              onChange={(e: any) => {
                const languageList = e.map((s: any) => s.value);
                setActiveFilters({
                  ...activeFilters,
                  language:
                    languageList.length > 0 ? languageList.join(",") : null,
                });
              }}
              isMulti
              isClearable
              isSearchable
            />
          </div>
          <div className="filter-block d-flex flex-row align-items-center mb-2">
            <h4>Length</h4>
            <SortButton quotes field="length" />
            <FilterButton quotes field="length" min={0} max={3100} />
          </div>
          <div className="filter-block d-flex flex-row align-items-center mb-2">
            <h4>Unique Words</h4>
            <SortButton quotes field="num_unique_words" />
            <FilterButton quotes field="num_unique_words" min={0} max={300} />
          </div>
          <div className="filter-block d-flex flex-row align-items-center mb-2">
            <h4>Syllables</h4>
            <SortButton quotes field="num_syllables" />
            <FilterButton quotes field="num_syllables" min={0} max={700} />
          </div>
          <div className="filter-block d-flex flex-row align-items-center mb-2">
            <h4>Score*</h4>
            <SortButton quotes field="score" />
            <FilterButton quotes field="score" min={-1} max={1} step={0.05} />
          </div>
        </div>
      </QuoteFiltersContext.Provider>
      <p className="mt-3" style={{ fontSize: 14 }}>
        * A quote's score indicates the quote's NLP score, or the level of
        sentiment/emotional tone behind the words.
      </p>

      {loading ? (
        <Loading />
      ) : (
        <div className="row d-flex flex-row py-5">
          {displayedData.map((quote: any) => (
            <QuoteItem item={quote} />
          ))}
          <div className="d-flex flex-row py-4 align-items-center justify-content-between">
            <h2 className="text-dark py-2 pr-4 m-0">
              <strong className="text-secondary">
                {data.results > 0 ? data.results : "No"}
              </strong>{" "}
              Results
            </h2>
            <Pagination
              page={currentPage}
              count={Math.ceil(data.quotes.length / numPerPage)}
              onChange={(_, page: number) => onPageChange(page)}
              showFirstButton
              showLastButton
              shape="rounded"
              color="primary"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Quotes;
