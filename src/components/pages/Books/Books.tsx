import React from "react";
import Grid from "../../templates/Grid/Grid";
import BookItem from "../../templates/Grid/items/BookItem";

function Books() {
  const books = [
    { id: "0", 
      image: "http://books.google.com/books/content?id=_oG_iTxP1pIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", 
      author: "Daniel Keyes",
      title: "Flowers for Algernon",
      genre: "Fiction",
      year: "2007",
      description: "Oscar-winning film Charly starring Cliff Robertson and Claire Bloom-a mentally challenged man receives an operation that turns him into a genius...and introduces him to heartache.",
      pageCount: "304",
      price: "8.99",
      buyLink: "https://play.google.com/store/books/details?id=_oG_iTxP1pIC&rdid=book-_oG_iTxP1pIC&rdot=1&source=gbs_api"},
  
      { id: "1", 
      image: "http://books.google.com/books/content?id=usvqAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api", 
      author: "Detroit Institute of Arts; George S. Keyes; Susan Donahue Kuretsky; Axel Rüger; Arthur K. Wheelock",
      title: "Masters of Dutch Painting",
      genre: "Art",
      year: "2004",
      description: "A comprehensive study of Dutch Art, from one of the world's premier collections.",
      pageCount: "288",
      price: "Not For Sale",
      buyLink: "",},
  
      { id: "2", 
      image: "http://books.google.com/books/content?id=jQxIAQAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api", 
      author: "Angela Mary Keyes",
      title: "The Five Senses",
      genre: "Senses and sensation",
      year: "1911",
      description: "No description found",
      pageCount: "252",
      price: "Not For Sale",
      buyLink: "",}
  ];
  return (
    <div>
      <div className="container-fluid pt-4 pb-4">
      <div className="container">
        <h1 className="text-center">Books</h1>
        <hr />
        <p className = "text-center">
          Find information on your favorite books!
        </p>
      </div>
    </div>
      <Grid data={books} Component = {BookItem}></Grid>
    </div>
  );
}

export default Books;
