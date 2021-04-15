import React, { useState } from "react";
import BookItem from "../../templates/Grid/items/BookItem";
import Pagination from "../../templates/Pagination";
import Loading from "../../features/Loading";
import useAxios from "axios-hooks";

import Select from "react-select";
import RangeFilter from "./features/RangeFilter";

import genreOptions from "./genreOptions";
const dropdownGenres = genreOptions.sort().map((genre) => {
  return { value: genre, label: genre };
});

function Books() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [activeFilters, setActiveFilters] = useState({});
  const [isPriceFilterVisible, setIsPriceFilterVisible] = useState(false);
  const [isYearFilterVisible, setIsYearFilterVisible] = useState(false);
  const [isPageFilterVisible, setIsPageFilterVisible] = useState(false);
  const [isRatingFilterVisible, setIsRatingFilterVisible] = useState(false);
  const [{ data, loading }] = useAxios({
    url: "/api/books",
    params: { ...activeFilters },
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

  return (
    <div className="container">
      <div className="row d-flex flex-row py-5">
        <h2 className="mb-5">Discover Books</h2>
        <div className="filters">
          <div className="filter-block d-flex flex-row align-items-center mb-2">
            <h4>Name</h4>
            <button
              className="btn btn-primary"
              onClick={() =>
                setActiveFilters({ ...activeFilters, sort_by: "name-A" })
              }
            >
              Sort
            </button>
          </div>
          <div className="filter-block d-flex flex-row align-items-center mb-2">
            <h4>Genre</h4>
            <Select
              className="dropdown"
              options={dropdownGenres}
              onChange={(e: any) => {
                const genreList = e.map((s: any) => s.value);
                setActiveFilters({
                  ...activeFilters,
                  genres: genreList.length > 0 ? genreList.join(",") : null,
                });
              }}
              isMulti
              isClearable
              isSearchable
            />
          </div>
          <div className="filter-block d-flex flex-row align-items-center mb-2">
            <h4>Price</h4>
            <button
              className="btn btn-primary"
              onClick={() =>
                setActiveFilters({ ...activeFilters, sort_by: "price-A" })
              }
            >
              Sort
            </button>
            <button
              className={`btn btn-${
                isPriceFilterVisible ? "danger" : "success"
              }`}
              onClick={() => {
                if (isPriceFilterVisible)
                  setActiveFilters({ ...activeFilters, price: null });
                setIsPriceFilterVisible(!isPriceFilterVisible);
              }}
            >
              {isPriceFilterVisible ? "Reset" : "Filter"}
            </button>
            {isPriceFilterVisible && (
              <RangeFilter
                min={1}
                max={60}
                prefix="$"
                onAfterChange={(priceRange: any) =>
                  setActiveFilters({
                    ...activeFilters,
                    price: [priceRange[0] - 0.01, priceRange[1]].join("-"),
                  })
                }
              />
            )}
          </div>
          <div className="filter-block d-flex flex-row align-items-center mb-2">
            <h4>Year</h4>
            <button
              className="btn btn-primary"
              onClick={() =>
                setActiveFilters({ ...activeFilters, sort_by: "year-A" })
              }
            >
              Sort
            </button>
            <button
              className={`btn btn-${
                isYearFilterVisible ? "danger" : "success"
              }`}
              onClick={() => {
                if (isYearFilterVisible)
                  setActiveFilters({ ...activeFilters, year: null });
                setIsYearFilterVisible(!isYearFilterVisible);
              }}
            >
              {isYearFilterVisible ? "Reset" : "Filter"}
            </button>
            {isYearFilterVisible && (
              <RangeFilter
                min={1940}
                max={2021}
                onAfterChange={(yearRange: any) =>
                  setActiveFilters({
                    ...activeFilters,
                    year: yearRange.join("-"),
                  })
                }
              />
            )}
          </div>
          <div className="filter-block d-flex flex-row align-items-center mb-2">
            <h4>Page Count</h4>
            <button
              className="btn btn-primary"
              onClick={() =>
                setActiveFilters({ ...activeFilters, sort_by: "page_count-A" })
              }
            >
              Sort
            </button>
            <button
              className={`btn btn-${
                isPageFilterVisible ? "danger" : "success"
              }`}
              onClick={() => {
                if (isPageFilterVisible)
                  setActiveFilters({ ...activeFilters, page_count: null });
                setIsPageFilterVisible(!isPageFilterVisible);
              }}
            >
              {isPageFilterVisible ? "Reset" : "Filter"}
            </button>
            {isPageFilterVisible && (
              <RangeFilter
                min={0}
                max={3000}
                step={10}
                onAfterChange={(pageCountRange: any) =>
                  setActiveFilters({
                    ...activeFilters,
                    page_count: pageCountRange.join("-"),
                  })
                }
              />
            )}
          </div>
          <div className="filter-block d-flex flex-row align-items-center mb-2">
            <h4>Average Rating</h4>
            <button
              className="btn btn-primary"
              onClick={() =>
                setActiveFilters({ ...activeFilters, sort_by: "avg_rating-A" })
              }
            >
              Sort
            </button>
            <button
              className={`btn btn-${
                isRatingFilterVisible ? "danger" : "success"
              }`}
              onClick={() => {
                if (isRatingFilterVisible)
                  setActiveFilters({ ...activeFilters, avg_rating: null });
                setIsRatingFilterVisible(!isRatingFilterVisible);
              }}
            >
              {isRatingFilterVisible ? "Reset" : "Filter"}
            </button>
            {isRatingFilterVisible && (
              <RangeFilter
                min={0}
                max={5}
                step={0.5}
                onAfterChange={(ratingRange: any) =>
                  setActiveFilters({
                    ...activeFilters,
                    avg_rating: ratingRange.join("-"),
                  })
                }
              />
            )}
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="row d-flex flex-row py-5">
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
        )}
      </div>
    </div>
  );
}

export default Books;
