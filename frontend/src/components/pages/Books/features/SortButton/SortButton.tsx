import React, { useContext } from "react";
import { FilterContext } from "../../Books";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

function SortButton({ field }: any) {
  const { activeFilters, setActiveFilters } = useContext(FilterContext);
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
