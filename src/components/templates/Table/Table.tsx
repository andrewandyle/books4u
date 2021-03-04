import React from "react";

function Table({ data }: any) {
  return (
    <table className="table table-bordered" style = {{marginLeft : "10px", width: "90%", }}>
        <thead className="thead-dark">
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
        </thead>
    </table>
  );
}

export default Table;
{/* <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table> */}