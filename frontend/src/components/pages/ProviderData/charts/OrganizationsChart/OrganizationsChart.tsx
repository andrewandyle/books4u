import React, { useState, useEffect } from "react";
import Loading from "../../../../features/Loading";
import useAxios from "axios-hooks";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = [
  "#1c56a5",
  "#23473b",
  "#3a0a0a",
  "#d09438",
  "#031c12",
];

function OrganizationsChart() {
  const [{ data, loading }] = useAxios({
    url: "https://disaster-averted.me/api/orgs",
    params: { results_per_page: 500 },
  });
  const [displayedData, setDisplayedData] = useState<object[]>([]);

  useEffect(() => {
    if (data) {
      const orgMapping: Record<string, number> = {};
      data.objects.forEach((org: any) => {
        if (orgMapping[org.type]) {
          orgMapping[org.type]++;
        } else {
          orgMapping[org.type] = 1;
        }
      });
      const displayedMapping: object[] = Object.keys(orgMapping)
        .map((key: string) => {
          return { name: key, value: orgMapping[key] };
        });
      setDisplayedData(displayedMapping);
    }
  }, [data]);

  return (
    <div className="mt-5 d-flex flex-column align-items-center">
      <h2>Number of Organizations of Each Type</h2>
      {loading || displayedData.length <= 0 ? (
        <Loading />
      ) : (
        <PieChart width={425} height={250}>
          <Pie
            nameKey="name"
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={displayedData}
            cx={200}
            cy={200}
            outerRadius={200}
          >
            {displayedData.map((_, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      )}
    </div>
  );
}

export default OrganizationsChart;
