import React from "react";
import Table from "../../templates/Table";

function Authors() {
  const authors = [
    { id: "0", 
    name: "J.K. Rowling", 
    works: "Harry Potter and the Sorcerer’s Stone, ...", 
    bio: "J. K. Rowling was born in the summer of 1965 at Yate General Hospital in England and grew up in Chepstow, Gwent.  She left Chepstow for Exeter University, where she ...",
    onTour: "No",
    lastInitial: "R"
    },
    { id: "1", 
    name: "F. Scott Fitzgerald", 
    works: "The Great Gatsby,  ...", 
    bio: "F. Scott Fitzgerald was considered the quintessential author of the Jazz Age. Born in St. Paul, Minnesota, in 1896, Fitzgerald attended Princeton University, where he ...",
    onTour: "No",
    lastInitial: "F"
    },

    { id: "2", 
    name: "John Steinbeck", 
    works: "The Grapes of Wrath, ...", 
    bio: "John Steinbeck, born in Salinas, California, in 1902, grew up in a fertile agricultural valley, about 25 miles from the Pacific Coast. Both the valley and the coast would serve as ...",
    onTour: "No",
    lastInitial: "S"
    },
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