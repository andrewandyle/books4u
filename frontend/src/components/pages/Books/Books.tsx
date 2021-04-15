import React, { useState, createContext } from "react";
import BookItem from "../../templates/Grid/items/BookItem";
import Pagination from "../../templates/Pagination";
import Loading from "../../features/Loading";
import useAxios from "axios-hooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Select from "react-select";
import SortButton from "./features/SortButton";
import FilterButton from "./features/FilterButton";

import genreOptions from "./genreOptions";
const dropdownGenres = genreOptions.sort().map((genre) => {
  return { value: genre, label: genre };
});

interface BookFilters {
  genres?: string;
  price?: string;
  year?: string;
  page_count?: string;
  avg_rating?: string;
  sort_by?: string;
}

interface FilterContextObject {
  activeFilters: BookFilters;
  setActiveFilters: Function;
}

export const FilterContext = createContext<FilterContextObject>({
  activeFilters: {},
  setActiveFilters: (value: any) => {},
});

function Books() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [activeFilters, setActiveFilters] = useState<BookFilters>({});
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
        <div className="d-flex flex-row mb-5 flex-wrap justify-content-between">
          <h2>Discover Books</h2>
          <div className="books-search input-group">
            <div className="form-outline">
              <input
                type="search"
                className="form-control"
                placeholder="Search books..."
              />
            </div>
            <button type="button" className="btn btn-primary">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>

        <FilterContext.Provider value={{ activeFilters, setActiveFilters }}>
          <div className="filters">
            <div className="filter-block d-flex flex-row align-items-center mb-2">
              <h4>Name</h4>
              <SortButton field="name" />
            </div>
            <div className="filter-block d-flex flex-row align-items-center mb-2">
              <h4>Genre</h4>
              <Select
                className="dropdown"
                options={dropdownGenres}
                placeholder="Choose genres..."
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
              <SortButton field="price" />
              <FilterButton field="price" min={1} max={60} />
            </div>
            <div className="filter-block d-flex flex-row align-items-center mb-2">
              <h4>Year</h4>
              <SortButton field="year" />
              <FilterButton field="year" min={1940} max={2021} />
            </div>
            <div className="filter-block d-flex flex-row align-items-center mb-2">
              <h4>Page Count</h4>
              <SortButton field="page_count" />
              <FilterButton field="page_count" min={0} max={3000} step={10} />
            </div>
            <div className="filter-block d-flex flex-row align-items-center mb-2">
              <h4>Average Rating</h4>
              <SortButton field="avg_rating" />
              <FilterButton field="avg_rating" min={0} max={5} step={0.5} />
            </div>
          </div>
        </FilterContext.Provider>

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
                data={data}
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
