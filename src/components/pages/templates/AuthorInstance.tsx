import React, { useEffect, useState } from "react";
const authors: Author[] = [
  { id: "1", name: "JK Rowling", works: "Harry Potter", bio: "This is a bio" },
  { id: "2", name: "author2", works: "works2", bio: "bio2"},
  { id: "3", name: "author3", works: "works3", bio: "bio3"},
];

interface Author {
  id: string;
  name: string;
  works: string;
  bio: string;
}

function AuthorInstance() {
    const [authorId, setAuthorId] = useState(0);
    useEffect(() => {
      const url = window.location.href;
      const split_url = url.split("/");
      const id = split_url[split_url.length - 1];
      setAuthorId(parseInt(id) - 1);
    }, []);
    return (
      <div className="d-flex flex-column align-items-center">
          <img className="p-2" src="../../../../src/logo.svg" alt="Author Image"/>
          <h2 className="p-2">{authors[authorId].name}</h2>
          <p className="p-1">{authors[authorId].works}</p>
          <p className="p-1">{authors[authorId].bio}</p>
          <p className="p-1">{authors[authorId].name}</p>
          <p className="p-1">{authors[authorId].name}</p>        
          <a href="#!" className="btn btn-primary">Link to Page?</a>
      </div>
    );
}

export default AuthorInstance;
