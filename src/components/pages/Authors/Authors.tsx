import React from "react";
import Table from "../../templates/Table";

function Authors() {
  const authors = [
    { id: "0", 
    name: "Verna Aardema", 
    works: "Porque Zumban los Mosquitos en los Oidos de la Gente", 
    onTour: "No",
    },

    { id: "1", 
    name: "Ken Burns", 
    works: "The Roosevelts", 
    onTour: "Yes",
    },

    { id: "2", 
    name: "Geoffrey C. Ward", 
    works: "Before the Trumpet", 
    onTour: "Yes",
    }
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