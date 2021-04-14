import React, { useState } from "react";
import BookItem from "../../templates/Grid/items/BookItem";
import Pagination from "../../templates/Pagination";
import Loading from "../../features/Loading";
import useAxios from "axios-hooks";

import { Range, createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
const RangeWithTooltip = createSliderWithTooltip(Range);

function Books() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [{ data, loading }] = useAxios({
    url: "/api/books",
    params: {
      genres: ["etc", "Photography", "Atmospheric carbon dioxide"].join(","),
    },
  });
  const [currentBooks, setCurrentBooks] = useState([]);

  const onPageChanged = (paginationData: {
    currentPage: any;
    totalPages: any;
    pageLimit: any;
  }) => {
    const { currentPage, totalPages, pageLimit } = paginationData;
    const offset = (currentPage - 1) * pageLimit;
    const currBooks = data.books.slice(offset, offset + pageLimit);
    setCurrentBooks(currBooks);
    setCurrentPage(currentPage);
    setTotalPages(totalPages);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
    <div className="container">
      <div className="row d-flex flex-row py-5">
        <h2>Discover Books</h2>
        <RangeWithTooltip
          min={0}
          max={100}
          defaultValue={[40, 60]}
          tipFormatter={(amount) => `$${amount}`}
          onAfterChange={(e) => console.log(e)}
          trackStyle={[
            {
              backgroundImage: `linear-gradient(
              to right,
              #30b5c1,
              #2fbcb2 32%,
              #4cbea2 67%,
              #5ebf94)`,
              height: "0.4rem",
            },
          ]}
          railStyle={{ height: "0.4rem" }}
          handleStyle={[
            {
              border: "3px solid #30b5c1",
              width: "1rem",
              height: "1rem",
            },
          ]}
        />
        {currentBooks.map((book: any) => (
          <BookItem item={book} />
        ))}
        <div className="d-flex flex-row py-4 align-items-center justify-content-between">
          <h2 className={headerClass}>
            <strong className="text-secondary">{data.books.length}</strong>{" "}
            Results
          </h2>
          {currentPage && (
            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
              Page <span className="font-weight-bold">{currentPage}</span> /{" "}
              <span className="font-weight-bold">{totalPages}</span>
            </span>
          )}
          <Pagination
            totalRecords={data.books.length}
            pageLimit={30}
            pageNeighbours={1}
            onPageChanged={onPageChanged}
          />
        </div>
      </div>
    </div>
  );
}

export default Books;
