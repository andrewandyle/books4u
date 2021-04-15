import React from "react";

import { Range, createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
const RangeWithTooltip = createSliderWithTooltip(Range);

function RangeFilter({ min, max, prefix, ...rest }: any) {
  return (
    <div style={{ width: 200, margin: "0 20px" }}>
      <RangeWithTooltip
        min={min}
        max={max}
        tipFormatter={(amount) => (prefix ? `${prefix}${amount}` : amount)}
        trackStyle={[
          {
            backgroundImage: `linear-gradient(315deg, #bc6f03 0%, #874000 74%)`,
            height: "0.4rem",
          },
        ]}
        railStyle={{ height: "0.4rem" }}
        handleStyle={[
          {
            border: "3px solid #874000",
            width: "1rem",
            height: "1rem",
          },
        ]}
        {...rest}
      />
      <div
        className="d-flex flex-row justify-content-between"
        style={{ fontSize: 12, color: "#874000" }}
      >
        <span>
          {prefix}
          {min}
        </span>
        <span>
          {prefix}
          {max}
        </span>
      </div>
    </div>
  );
}

export default RangeFilter;
