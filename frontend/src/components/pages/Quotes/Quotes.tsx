import React, { useState } from "react";
import QuoteItem from "../../templates/Grid/items/QuoteItem";
import Pagination from "../../templates/Pagination";
import Loading from "../../Loading";
import useAxios from "axios-hooks";

function Quotes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [{ data, loading }] = useAxios("/api/quotes");
  const [currentQuotes, setCurrentQuotes] = useState([]);

  const onPageChanged = (paginationData: {
    currentPage: any;
    totalPages: any;
    pageLimit: any;
  }) => {
    const { currentPage, totalPages, pageLimit } = paginationData;
    const offset = (currentPage - 1) * pageLimit;
    const currQuotes = data.quotes.slice(offset, offset + pageLimit);
    setCurrentQuotes(currQuotes);
    setCurrentPage(currentPage);
    setTotalPages(totalPages);
  };

  const headerClass = [
    "text-dark py-2 pr-4 m-0",
    currentPage ? "border-gray border-right" : "",
  ]
    .join(" ")
    .trim();

  return loading ? (
    <Loading />
  ) : (
    <div className="container mb-5">
      <div className="row d-flex flex-row py-5">
        <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
          <div className="d-flex flex-row align-items-center">
            <h2 className={headerClass}>
              <strong className="text-secondary">{data.quotes.length}</strong>{" "}
              Quotes
            </h2>
            {currentPage && (
              <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                <span className="font-weight-bold">{totalPages}</span>
              </span>
            )}
          </div>
          <div className="d-flex flex-row py-4 align-items-center">
            <Pagination
              totalRecords={data.quotes.length}
              pageLimit={18}
              pageNeighbours={1}
              onPageChanged={onPageChanged}
            />
          </div>
        </div>
        {currentQuotes.map((quote) => (
          <QuoteItem item={quote} />
        ))}
      </div>
    </div>
  );
}

export default Quotes;
