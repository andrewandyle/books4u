import React from "react";
import BookItem from "./items/BookItem"

function Grid( { data } : any ) {
    console.log(data)
  return (
    <div>
        {data.map((item:any)=>(
            <BookItem item = {item}></BookItem>
        ))}
    </div>
  );
}

export default Grid;
