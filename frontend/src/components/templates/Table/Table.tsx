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
          {Object.keys(data[0]).map(
            (header) => header !== "id" && <th>{header.toUpperCase()}</th>
          )}
        </tr>
        {data.map((row: any) => (
          <tr>
            {Object.values(row).map(
              (item: any, index) =>
                Object.keys(row).find((key) => row[key] === item) !== "id" && (
                  <td>
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
