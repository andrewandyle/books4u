import React from "react";
import DisasterTypesChart from "./charts/DisasterTypesChart";
import PopulationDensityChart from "./charts/PopulationDensityChart";
import OrganizationsChart from "./charts/OrganizationsChart";
import ChartIcon from "../../media/chart.png";

function ProviderData() {
  return (
    <div className="container">
      <div className="mt-5 d-flex align-items-center">
        <img
          src={ChartIcon}
          alt="Chart"
          width={40}
          style={{ marginRight: 15 }}
        />
        <h2>Our Provider's Visualizations</h2>
      </div>
      <h4>
        From our provider,{" "}
        <a href="https://disaster-averted.me/" target="_blank" rel="noreferrer">
          Disaster Averted.
        </a>
      </h4>
      <h5 className="mb-5">Hover over a chart for more information!</h5>
      <DisasterTypesChart />
      <PopulationDensityChart />
      <OrganizationsChart />
    </div>
  );
}

export default ProviderData;
