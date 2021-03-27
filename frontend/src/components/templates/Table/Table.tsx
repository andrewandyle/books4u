import React from "react";
import { Link } from "react-router-dom";

function Table({ data }: any) {
  return (
    <table
      className="table table-bordered"
      style={{ marginLeft: "10px", width: "90%" }}
    >
      <thead className="thead-dark">
        <tr>
          console.log(data[0])
          {Object.keys(data[0]).map(
            (header) =>
              header !== "id" && <th key={header}>{header.toUpperCase()}</th>
          )}
        </tr>
        {data.map((row: any) => (
          <tr key={row.id}>
            {Object.values(row).map(
              (item: any, index) =>
                Object.keys(row).find((key) => row[key] === item) !== "id" && (
                  <td key={`index_${index}_row_${row.id}`}>
                    {index === 1 ? (
                      <Link to={`/author/${row.id}`}>{item}</Link>
                    ) : (
                      <div>{item}</div>
                    )}
                  </td>
                )
            )}
          </tr>
        ))}
      </thead>
    </table>
  );
}

export default Table;
