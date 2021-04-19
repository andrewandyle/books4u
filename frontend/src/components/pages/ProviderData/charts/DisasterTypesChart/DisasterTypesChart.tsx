// @ts-nocheck
import React, { useState, useEffect } from "react";
import Loading from "../../../../features/Loading";
import useAxios from "axios-hooks";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const types = [
  "Flood",
  "Tropical Cyclone",
  "Earthquake",
  "Epidemic",
  "Flash Flood",
  "Drought",
  "Cold Wave",
  "Volcano",
  "Severe Local Storm",
  "Land Slide",
];

function DisasterTypesChart() {
  const [{ data, loading }] = useAxios({
    url: "https://disaster-averted.me/api/disasters",
    params: { results_per_page: 2000 },
  });
  const [displayedData, setDisplayedData] = useState<object[]>([]);

  useEffect(() => {
    if (data) {
      let disasterMapping: object[] = Array(24);
      data.objects.forEach((disaster: any) => {
        const type: string = disaster.type;
        if (types.includes(type)) {
          const yearObject: object = disasterMapping[disaster.year - 1997];
          disasterMapping[disaster.year - 1997] = yearObject
            ? {
                ...yearObject,
                [disaster.type]: yearObject[type] ? yearObject[type] + 1 : 1,
              }
            : { [disaster.type]: 1 };
        }
      });
      const yearsToDisasters = disasterMapping.map((obj, index) => {
        return { year: index + 1997, ...obj };
      });
      setDisplayedData(yearsToDisasters);
    }
  }, [data]);

  return (
    <div className="mb-5 d-flex flex-column align-items-center">
      <h2>Number of Each Type of Disaster Per Year</h2>
      <p>This visualization only includes the top 10 most common disasters.</p>
      {loading || displayedData.length <= 0 ? (
        <Loading />
      ) : (
        <BarChart
          width={800}
          height={600}
          data={displayedData}
          layout="horizontal"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="category"
            dataKey="year"
            label={{
              value: "Year",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            label={{
              value: "Number of Disasters",
              angle: -90,
              position: "insideLeft",
              offset: 15,
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="Flood" stackId="a" fill="#83d5f5" />
          <Bar dataKey="Tropical Cyclone" stackId="a" fill="#5caca8" />
          <Bar dataKey="Earthquake" stackId="a" fill="#83675a" />
          <Bar dataKey="Epidemic" stackId="a" fill="#d46969" />
          <Bar dataKey="Flash Flood" stackId="a" fill="#2466b1" />
          <Bar dataKey="Drought" stackId="a" fill="#b3b165" />
          <Bar dataKey="Cold Wave" stackId="a" fill="#c8e6f1" />
          <Bar dataKey="Volcano" stackId="a" fill="#f17704" />
          <Bar dataKey="Severe Local Storm" stackId="a" fill="#594779" />
          <Bar dataKey="Land Slide" stackId="a" fill="#5c3f38" />
        </BarChart>
      )}
    </div>
  );
}

export default DisasterTypesChart;
