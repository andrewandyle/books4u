import React from "react";
import Table from "../../templates/Table";

function Authors() {
  const authors = [
    { id: "1", name: "name1", works: "works1" },
    { id: "2", name: "name2", works: "works2" },
    { id: "3", name: "name3", works: "works3" },
  ];
  return (<div>
    <div>
        <div className="container-fluid pt-4 pb-4 d-flex flex-column align-items-center">
          <div className="container align-items-center">
              <h1 className="text-center">Authors</h1>
              <hr />
              <p className = "text-center">
                Find information on your favorite authors!
              </p>
          </div>
          <Table data={authors}></Table>
       </div>
    </div>
  </div>);
}

export default Authors;