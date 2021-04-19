import React from "react";
import GenresChart from "./charts/GenresChart";
import RatingsChart from "./charts/RatingsChart";
import ScoresChart from "./charts/ScoresChart";
import ChartIcon from "../../media/chart.png";

function OurData() {
  return (
    <div className="container">
      <div className="mt-5 d-flex align-items-center">
        <img
          src={ChartIcon}
          alt="Chart"
          width={40}
          style={{ marginRight: 15 }}
        />
        <h2>Our Data Visualizations</h2>
      </div>
      <h5 className="mb-5">Hover over a chart for more information!</h5>
      <GenresChart />
      <RatingsChart />
      <ScoresChart />
    </div>
  );
}

export default OurData;
