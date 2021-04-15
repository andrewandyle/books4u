import React, { useState, useContext } from "react";
import { FilterContext } from "../../Books";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import RangeFilter from "../RangeFilter";

function FilterButton({ field, ...rest }: any) {
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const { activeFilters, setActiveFilters } = useContext(FilterContext);
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
              ].join("-"),
            })
          }
          {...rest}
        />
      )}
    </>
  );
}

export default FilterButton;
