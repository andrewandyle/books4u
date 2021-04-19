import React, { useState, useEffect } from "react";
import Loading from "../../../../features/Loading";
import useAxios from "axios-hooks";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

function ScoresChart() {
  const [{ data, loading }] = useAxios("/api/quotes");
  const [displayedData, setDisplayedData] = useState<object[]>([]);

  useEffect(() => {
    const ranges = [
      -1,
      -0.9,
      -0.8,
      -0.7,
      -0.6,
      -0.5,
      -0.4,
      -0.3,
      -0.2,
      -0.1,
      0,
      0.1,
      0.2,
      0.3,
      0.4,
      0.5,
      0.6,
      0.7,
      0.8,
      0.9,
    ];

    if (data) {
      const scoreMapping: Record<string, number> = {};
      data.quotes.forEach((quote: any) => {
        const quoteScore: number =
          [...ranges].reverse().find((score) => quote.score >= score) || 0;
        if (scoreMapping[quoteScore]) {
          scoreMapping[quoteScore]++;
        } else {
          scoreMapping[quoteScore] = 1;
        }
      });
      const displayedMapping: object[] = ranges.map((key: number) => {
        return {
          name: `${key} to ${(key + 0.09).toFixed(2)}`,
          value: scoreMapping[key],
        };
      });
      setDisplayedData(displayedMapping);
    }
  }, [data]);

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="mt-5">Number of Quotes from Score* Ranges</h2>
      <p style={{ fontSize: 14 }}>
        * A quote's score indicates the quote's NLP score, or the level of
        sentiment/emotional tone behind the words.
      </p>
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
          <Tooltip />
          <Bar dataKey="value" fill="#FF89FF" />
        </BarChart>
      )}
    </div>
  );
}

export default ScoresChart;
