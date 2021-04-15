import React from "react";
import "./Search.css";
import { Card } from "react-bootstrap";
import { Highlight} from "react-instantsearch-dom";
import { isPropertySignature } from "typescript";

function BookCard(props:any) {
    const attributes = [
        {
            name: "Name:",
            attribute: "name",
            attribute_id: 0
        },
        {
            name: "Author Names:",
            attribute: "author_names",
            attribute_id: 1
        },
        {
            name: "Genres:",
            attribute: "genres",
            attribute_id: 2
        },
        {
            name: "Average Rating:",
            attribute: "avg_rating",
            attribute_id: 3
        },
        {
            name: "Book ID",
            attribute: "book_id",
            attribute_id: 4
        },
        {
            name: "Description",
            attribute: "description",
            attribute_id: 5
        },
        {
            name: "Image",
            attribute: "image",
            attribute_id: 6
        },
        {
            name: "Language",
            attribute: "language",
            attribute_id: 7
        },
        {
            name: "Maturity Rating",
            attribute: "maturity_rating",
            attribute_id: 8
        },
        {
            name: "Number of Ratings",
            attribute: "num_ratings",
            attribute_id: 9
        },
        {
            name: "Page Count",
            attribute: "page_count",
            attribute_id: 9
        },
        {
            name: "Price",
            attribute: "price",
            attribute_id: 9
        },
        {
            name: "Purchase Link",
            attribute: "purchase_link",
            attribute_id: 9
        },
        {
            name: "Year",
            attribute: "year",
            attribute_id: 9
        }


    ]


    const DisplayText = () => {
        return (
            attributes.map((book) => (
                <Card.Text className="card-text-style" key={book.attribute_id}>
                    <b>{book.name}</b>
                    <Highlight attribute={book.attribute} tagName="mark" hit={props.hit}/>
                </Card.Text>
            )));
    }

    return (
        <Card>
            <Card.Body>
                <a href={"books/" + props.hit.book_id}>
                    <u>
                        <Card.Title className="card-title-style">
                            {props.hit.name}
                        </Card.Title>
                    </u>
                </a>
                {DisplayText()}
            </Card.Body>
        </Card>
    )
}

export default BookCard;