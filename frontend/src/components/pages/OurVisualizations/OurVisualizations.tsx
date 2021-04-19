import React from "react";
import GenresChart from "./charts/GenresChart";
import YearsChart from "./charts/YearsChart";
import ChartIcon from "../../media/chart.png";

function OurVisualizations() {
  return (
    <div className="container">
      <div className="mt-5 mb-5 d-flex align-items-center">
        <img
          src={ChartIcon}
          alt="Chart"
          width={40}
          style={{ marginRight: 15 }}
        />
        <h2>Our Visualizations</h2>
      </div>
      <GenresChart />
      <YearsChart />
    </div>
  );
}

export default OurVisualizations;
