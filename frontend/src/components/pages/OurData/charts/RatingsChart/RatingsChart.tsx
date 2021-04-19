import React, { useState, useEffect } from "react";
import Loading from "../../../../features/Loading";
import useAxios from "axios-hooks";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function RatingsChart() {
  const [{ data, loading }] = useAxios("/api/authors");
  const [displayedData, setDisplayedData] = useState<object[]>([]);

  useEffect(() => {
    if (data) {
      const ratingsToBooks: object[] = [];
      data.authors.forEach((author: any) => {
        if (author.avg_rating) {
          ratingsToBooks.push({
            name: `${author.first_name} ${author.last_name || ""}`,
            avg_rating: author.avg_rating.toFixed(2),
            num_published_books: author.num_published_books,
          });
        }
      });
      setDisplayedData(ratingsToBooks);
    }
  }, [data]);

  return (
    <div className="mb-5 d-flex flex-column align-items-center">
      <h2>Average Rating vs Number of Books for All Authors</h2>
      {loading || displayedData.length <= 0 ? (
        <Loading />
      ) : (
        <ScatterChart width={600} height={600} data={displayedData}>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="num_published_books"
            name="Number of Published Books"
          />
          <YAxis
            type="number"
            dataKey="avg_rating"
            name="Average Rating"
            domain={[2, 5]}
            tickCount={4}
          />
          <ZAxis type="category" dataKey="name" name="Author" />
          <Scatter data={displayedData} fill="#4169E1" />
          <Tooltip />
        </ScatterChart>
      )}
    </div>
  );
}

export default RatingsChart;
