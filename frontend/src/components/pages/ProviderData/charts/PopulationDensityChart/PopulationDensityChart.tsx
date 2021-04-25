import React, { useState, useEffect } from "react";
import Loading from "../../../../features/Loading";
import useAxios from "axios-hooks";
import Pagination from "@material-ui/lab/Pagination";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface CountryObject {
  name: string;
  "Population Density": number;
}

function PopulationDensityChart() {
  const [{ data, loading }] = useAxios({
    url: "https://disaster-averted.me/api/countries",
    params: { results_per_page: 200 },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const numPerPage = 10;
  const [storedData, setStoredData] = useState<CountryObject[]>([]);
  const [displayedData, setDisplayedData] = useState<CountryObject[]>([]);

  useEffect(() => {
    if (data) {
      let countryMapping: CountryObject[] = [];
      data.objects.forEach((country: any) => {
        countryMapping.push({
          name: country.name,
          "Population Density": country.population / country.area,
        });
      });
      setStoredData(
        countryMapping.sort((a, b) =>
          a["Population Density"] > b["Population Density"] ? -1 : 1
        )
      );
    }
  }, [data]);

  useEffect(() => {
    setCurrentPage(1);
    setDisplayedData(storedData.slice(0, numPerPage));
  }, [storedData]);

  const onPageChange = (pageNumber: number) => {
    const zeroIndexedPage = pageNumber - 1;
    setDisplayedData(
      storedData.slice(
        zeroIndexedPage * numPerPage,
        zeroIndexedPage * numPerPage + numPerPage
      )
    );
    setCurrentPage(pageNumber);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h2>Population Density (Population / Area (sq. km)) per Country</h2>
      <p>This visualization is sorted by descending population density.</p>
      {loading || displayedData.length <= 0 ? (
        <Loading />
      ) : (
        <div>
          <BarChart
            width={1000}
            height={600}
            data={displayedData}
            layout="vertical"
            margin={{
              top: 5,
              right: 50,
              left: 150,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              domain={[0, 1000]}
              label={{
                value: "Population Density (Population / Area (sq. km))",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              type="category"
              dataKey="name"
              label={{
                value: "Country",
                angle: -90,
                position: "insideLeft",
                offset: -70,
              }}
            />
            <Tooltip />
            <Bar dataKey="Population Density" fill="#7947ec" />
          </BarChart>
          <Pagination
            page={currentPage}
            count={Math.ceil(storedData.length / numPerPage)}
            onChange={(_, page: number) => onPageChange(page)}
            showFirstButton
            showLastButton
            shape="rounded"
            color="primary"
          />
        </div>
      )}
    </div>
  );
}

export default PopulationDensityChart;
