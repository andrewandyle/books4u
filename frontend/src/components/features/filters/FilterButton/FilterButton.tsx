import React, { useState, useContext } from "react";
import { BookFiltersContext, BookFilters } from "../../../pages/Books/Books";
import {
  QuoteFiltersContext,
  QuoteFilters,
} from "../../../pages/Quotes/Quotes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import RangeFilter from "../RangeFilter";

function FilterButton({ field, quotes, ...rest }: any) {
  const [isSliderVisible, setIsSliderVisible] = useState(false);
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
    <>
      <button
        className={`btn btn-${
          isSliderVisible ? "danger" : "success"
        } d-flex align-items-center justify-content-between`}
        onClick={() => {
          if (isSliderVisible)
            setActiveFilters({ ...activeFilters, [field]: undefined });
          setIsSliderVisible(!isSliderVisible);
        }}
      >
        <FontAwesomeIcon icon={faFilter} />
        {isSliderVisible ? "Reset" : "Filter"}
      </button>
      {isSliderVisible && (
        <RangeFilter
          prefix={field === "price" && "$"}
          onAfterChange={(range: any) =>
            setActiveFilters({
              ...activeFilters,
              [field]: [
                field === "price" ? range[0] - 0.01 : range[0],
                range[1],
              ].join(field !== "score" ? "-" : ":"),
            })
          }
          {...rest}
        />
      )}
    </>
  );
}

export default FilterButton;
