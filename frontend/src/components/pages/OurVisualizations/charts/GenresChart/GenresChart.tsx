import React, { useState, useEffect } from "react";
import Loading from "../../../../features/Loading";
import useAxios from "axios-hooks";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = [
  "#EBA299",
  "#EBD399",
  "#EBEA99",
  "#B4F0A7",
  "#A9D1F7",
  "#CC99FF",
];

function GenresChart() {
  const [{ data, loading }] = useAxios("/api/books");
  const [displayedData, setDisplayedData] = useState<object[]>([]);

  useEffect(() => {
    if (data) {
      const genreMapping: Record<string, number> = {};
      data.books.forEach((book: any) => {
        if (book.genres) {
          book.genres.forEach((genre: any) => {
            if (genreMapping[genre]) {
              genreMapping[genre]++;
            } else {
              genreMapping[genre] = 1;
            }
          });
        }
      });
      const displayedMapping: object[] = Object.keys(genreMapping)
        .filter((key: string) => genreMapping[key] >= 10)
        .map((key: string) => {
          return { name: key, value: genreMapping[key] };
        });
      setDisplayedData(displayedMapping);
    }
  }, [data]);

  return (
    <div className="d-flex flex-column align-items-center">
      <h2>Number of Books from the Most Popular Genres</h2>
      <p>(hover for info)</p>
      {loading || displayedData.length <= 0 ? (
        <Loading />
      ) : (
        <PieChart width={425} height={425}>
          <Pie
            nameKey="name"
            dataKey="value"
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

export default GenresChart;
