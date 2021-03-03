import React, {useEffect,useState} from "react";

const books : Book[] = [{id:'1', title:'title1', author:'author1'}, {id:'2', title:'title2', author:'author2'}, {id:'3',title:'title3', author:'author3'}]


interface Book{
  id : string
  author : string
  title : string


}

function BookInstance() {
  const [bookId, setBookId] = useState(0)
  useEffect(()=> {
    const url = window.location.href
    const split_url = url.split("/")
    const id = split_url[split_url.length-1]
    setBookId(parseInt(id)-1)
  })
  return (
    <div>
      Title: {books[bookId].title}
      Author: {books[bookId].author}
    </div>

  );
}

export default BookInstance;
