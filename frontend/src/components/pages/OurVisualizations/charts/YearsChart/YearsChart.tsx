import React, { useState, useEffect } from "react";
import Loading from "../../../../features/Loading";
import useAxios from "axios-hooks";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

function YearsChart() {
  const [{ data, loading }] = useAxios("/api/books");
  const [displayedData, setDisplayedData] = useState<object[]>([]);

  useEffect(() => {
    const ranges = [
      "1940-1945",
      "1946-1950",
      "1951-1955",
      "1956-1960",
      "1961-1965",
      "1966-1970",
      "1971-1975",
      "1976-1980",
      "1981-1985",
      "1986-1990",
      "1991-1995",
      "1996-2000",
      "2001-2005",
      "2006-2010",
      "2011-2015",
      "2016-2021",
    ];

    if (data) {
      const yearMapping: Record<string, number> = {};
      data.books.forEach((book: any) => {
        if (book.year) {
          const bookYear: string =
            [...ranges]
              .reverse()
              .find((year) => book.year.substring(0, 4) >= year) || "N/A";
          if (yearMapping[bookYear]) {
            yearMapping[bookYear]++;
          } else {
            yearMapping[bookYear] = 1;
          }
        }
      });
      const displayedMapping: object[] = ranges.map(
        (key: string) => {
          return { name: key, value: yearMapping[key] };
        }
      );
      setDisplayedData(displayedMapping);
    }
  }, [data]);

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="mt-5">Number of Books from Year Ranges</h2>
      <p>(hover for info)</p>
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
          <XAxis type="category" dataKey="name" />
          <YAxis type="number" />
          <Bar dataKey="value" fill="#FF89FF" />
          <Tooltip />
        </BarChart>
      )}
    </div>
  );
}

export default YearsChart;
