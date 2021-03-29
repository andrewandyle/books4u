import React from "react";
import { Link } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import "./BookItem.css";

function BookItem({ item, excludeAuthor }: any) {
  const { id, authors, name, year, price, page_count, image } = item;
  const [isFlipped, setIsFlipped] = React.useState(false);
  return (
    <div className="p-2 col-lg-4 col-md-6">
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div onMouseEnter={() => setIsFlipped((prev) => !prev)} className="flip-card">
            {image && <img className="image-container" src={image} alt={`Cover of ${name}`}></img>}
            <h3 className="title">{name}</h3>
          </div>
          <div onMouseLeave={() => setIsFlipped((prev) => !prev)} className="flip-card">
           <div className="flip-back">
            This is back.
           </div>
           </div>
        </ReactCardFlip>    
    </div>  

  );
}

export default BookItem;
