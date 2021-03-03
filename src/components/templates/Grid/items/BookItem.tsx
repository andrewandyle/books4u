import React from "react";

function BookItem( { item } : any ) {
const {id, title, author} = item
  return (
    <div>
        title: {title}
        <br></br>
        author: {author}
    </div>
  );
}

export default BookItem;
