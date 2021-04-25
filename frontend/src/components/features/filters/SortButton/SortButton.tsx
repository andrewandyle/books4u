import React, { useContext } from "react";
import { BookFiltersContext, BookFilters } from "../../../pages/Books/Books";
import {
  QuoteFiltersContext,
  QuoteFilters,
} from "../../../pages/Quotes/Quotes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

function SortButton({ field, quotes }: any) {
  const { bookFilters, setBookFilters } = useContext(BookFiltersContext);
  const { quoteFilters, setQuoteFilters } = useContext(QuoteFiltersContext);
  let activeFilters: BookFilters | QuoteFilters, setActiveFilters: Function;
  if (quotes) {
    activeFilters = quoteFilters;
    setActiveFilters = setQuoteFilters;
  } else {
    activeFilters = bookFilters;
    setActiveFilters = setBookFilters;
  }

  return (
    <button
      className="btn btn-primary d-flex align-items-center justify-content-evenly"
      onClick={() =>
        setActiveFilters({
          ...activeFilters,
          sort_by:
            !activeFilters.sort_by || !activeFilters.sort_by.includes(field)
              ? `${field}-A`
              : activeFilters.sort_by === `${field}-A`
              ? `${field}-D`
              : null,
        })
      }
    >
      <FontAwesomeIcon
        icon={
          !activeFilters.sort_by || !activeFilters.sort_by.includes(field)
            ? faSort
            : activeFilters.sort_by === `${field}-A`
            ? faSortUp
            : faSortDown
        }
      />{" "}
      Sort
    </button>
  );
}

export default SortButton;
