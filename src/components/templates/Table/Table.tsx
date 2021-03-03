import React from "react";

function Table({ data }: any) {
  return (
    <table>
      <tr>
        {Object.keys(data[0]).map((header) => (
          <th>{header.toUpperCase()}</th>
        ))}
      </tr>
      {data.map((row: any) => (
        <tr>
          {Object.values(row).map((item: any) => (
            <td>{item}</td>
          ))}
        </tr>
      ))}
    </table>
  );
}

export default Table;
