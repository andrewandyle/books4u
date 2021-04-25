import React, { useState, useEffect, useRef, createContext } from "react";
import BookItem from "../../features/items/BookItem";
import Loading from "../../features/Loading";
import useAxios from "axios-hooks";
import Pagination from "@material-ui/lab/Pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import BookIcon from "../../media/book.png";

import Select from "react-select";
import SortButton from "../../features/filters/SortButton";
import FilterButton from "../../features/filters/FilterButton";

import genreOptions from "./genreOptions";
const dropdownGenres = genreOptions.sort().map((genre) => {
  return { value: genre, label: genre };
});

export interface BookFilters {
  genres?: string;
  price?: string;
  year?: string;
  page_count?: string;
  avg_rating?: string;
  sort_by?: string;
}

interface BookContextObject {
  bookFilters: BookFilters;
  setBookFilters: Function;
}

export const BookFiltersContext = createContext<BookContextObject>({
  bookFilters: {},
  setBookFilters: (value: any) => {},
});

function Books() {
  const searchText: any = useRef();
  const numPerPage = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedData, setDisplayedData] = useState([]);
  const [activeFilters, setActiveFilters] = useState<BookFilters>({});
  const [{ data, loading }] = useAxios({
    url: "/api/books",
    params: { ...activeFilters },
  });

  useEffect(() => {
    if (data && data.books) {
      setCurrentPage(1);
      setDisplayedData(data.books.slice(0, numPerPage));
    }
  }, [data]);

  const onPageChange = (pageNumber: number) => {
    const zeroIndexedPage = pageNumber - 1;
    setDisplayedData(
      data.books.slice(
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

  const searchBooks = () => {
    window.location.assign(`/search/q=${searchText.current.value}/model=book`);
  };

  return (
    <div className="container">
      <div className="row d-flex flex-row py-5">
        <div className="d-flex flex-row mb-5 flex-wrap justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src={BookIcon}
              alt="Book"
              width={40}
              style={{ marginRight: 15 }}
            />
            <h2>Discover Books</h2>
          </div>
          <div className="search-margin input-group">
            <div className="form-outline">
              <input
                type="search"
                ref={searchText}
                className="form-control"
                placeholder="Search books..."
                onKeyPress={(event: any) => {
                  if (event.key === "Enter") {
                    searchBooks();
                  }
                }}
              />
            </div>
            <button className="btn btn-primary" onClick={() => searchBooks()}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>

        <BookFiltersContext.Provider
          value={{
            bookFilters: activeFilters,
            setBookFilters: setActiveFilters,
          }}
        >
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
            <div className="filter-block d-flex flex-row align-items-center mb-2">
              <h4>Price</h4>
              <SortButton field="price" />
              <FilterButton field="price" min={1} max={60} />
            </div>
          </div>
        </BookFiltersContext.Provider>

        {loading ? (
          <Loading />
        ) : (
          <div className="row d-flex flex-row py-5">
            {displayedData.map((book: any) => (
              <BookItem item={book} />
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
                count={Math.ceil(data.books.length / numPerPage)}
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
    </div>
  );
}

export default Books;
