import React, { useState, useEffect, useRef } from "react";
import QuoteItem from "../../features/items/QuoteItem";
import Loading from "../../features/Loading";
import useAxios from "axios-hooks";
import Pagination from "@material-ui/lab/Pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Quotes() {
  const searchText: any = useRef();
  const numPerPage = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedData, setDisplayedData] = useState([]);
  const [{ data, loading }] = useAxios("/api/quotes");

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
    <div
      className="container align-items-center"
      style={{ textAlign: "center" }}
    >
      <div className="mb-5 mt-5 d-flex flex-row flex-wrap justify-content-between">
        <h2>Discover Quotes</h2>
        <div className="input-group">
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
      {loading ? (
        <Loading />
      ) : (
        <div className="row d-flex flex-row py-5">
          {displayedData.map((quote: any) => (
            <QuoteItem item={quote} />
          ))}
          <div className="d-flex flex-row py-4 align-items-center justify-content-between">
            <h2 className="text-dark py-2 pr-4 m-0">
              <strong className="text-secondary">{data.results}</strong> Results
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
