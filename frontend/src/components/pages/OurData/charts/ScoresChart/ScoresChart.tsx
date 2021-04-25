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
          "Score Range": `${key} to ${(key + 0.09).toFixed(2)}`,
          "Number of Quotes": scoreMapping[key],
        };
      });
      setDisplayedData(displayedMapping);
    }
  }, [data]);

  return (
    <div className="pb-5 d-flex flex-column align-items-center">
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
          margin={{ bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="category"
            dataKey="Score Range"
            label={{
              value: "Score Range",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            type="number"
            label={{
              value: "Number of Quotes",
              angle: -90,
              position: "insideLeft",
              offset: 15,
            }}
          />
          <Tooltip />
          <Bar dataKey="Number of Quotes" fill="#FF89FF" />
        </BarChart>
      )}
    </div>
  );
}

export default ScoresChart;
