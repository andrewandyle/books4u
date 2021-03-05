import React, { useEffect, useState } from "react";
const authors: Author[] = [
    { id: "0", 
    name: "Verna Aardema", 
    works: "Porque Zumban los Mosquitos en los Oidos de la Gente", 
    bio: "Verna Aardema grew up in New Era, Michigan as the third in a family of nine children.  A cedar swamp in the back of her house served as her inspiration and retreat as a young aspiring writer. At Michigan State College, Verna took many writing courses, but none that were aimed at writing for children.  She didn't think about the children's book field until many years later, when she had to make up stories to get her baby daughter to eat. Verna writes mostly African folktales because of her fascination with that infinitely diverse continent.  Out of its jungles, deserts, and great plains have come some of the most unusual and charming folktales in the world. As of today, Verna has published over 25 books and is still working on more.  Her books have been translated into French, Spanish, Dutch, Japanese, Chinese and Afrikaans. Verna lives in North Fort Myers, Florida, with her husband, Albert. Petra Mathers was born and raised in Germany and moved to the United States as a young woman.  She now lives in Portland, Oregon. Petra is an illustrator first, and a writer second.  While she brews a story of her own on some burner in the back of her mind, she is busy illustrating other people's books.  Petra compares illustrating other people's books to \"visiting\".  A certain politeness, consideration, and modesty are necessary. She is a self-described \"sucker for love\" and her stories are always about love -- she finds unsung heroes very endearing, as well as the clumsy, balding, fumbling, shy creatures who are quietly heroic, risking everything for love",
    onTour: false,
    image: "https://aalbc.com/author-photos/Verna_Aardema.jpg"},

    { id: "1", 
    name: "Ken Burns", 
    works: "The Roosevelts", 
    bio: "Ken Burns, director and producer of The Roosevelts: An Intimate History, has been making documentary films for more than thirty-five years.  Since the Academy Award–nominatedBrooklyn Bridge in 1981, Burns has gone on to direct and produce some of the most acclaimed historical documentaries ever made, including The Civil War, Baseball, Jazz, The War, and The National Parks: America’s Best Idea. Burns’s films have been honored with dozens of major awards, including thirteen Emmy Awards, two Grammy Awards, and two Oscar nominations; and in September 2008, at the News & Documentary Emmy Awards, Burns was honored by the Academy of Television Arts & Sciences with a Lifetime Achievement Award.",
    onTour: true,
    image: "https://images4.penguinrandomhouse.com/author/44856"},

    { id: "2", 
    name: "Geoffrey C. Ward", 
    works: "Before the Trumpet", 
    bio: "Geoffrey C. Ward is the author of seventeen books, including three focused on FDR: Before the Trumpet: Young Franklin Roosevelt, 1882–1905; A First-Class Temperament: The Emergence of Franklin Roosevelt (which won the Los Angeles Times Book Prize for Biography, the National Book Critics Circle Award, and the Francis Parkman Prize of the Society of American Historians, and was a finalist for the Pulitzer Prize); and Closest Companion: The Unknown Story of the Intimate Friendship Between Franklin Roosevelt and Margaret Suckley. A longtime collaborator with Ken Burns, he has also won seven Emmys and written twenty-seven historical documentaries for PBS, either on his own or in collaboration with others, including The Roosevelts: An Intimate History.",
    onTour: true,
    image: "https://images3.penguinrandomhouse.com/author/32427"},
];

interface Author {
  id: string;
  name: string;
  works: string;
  bio: string;
  onTour: boolean;
  image: string;
}

function AuthorInstance() {
    const [authorId, setAuthorId] = useState(0);
    useEffect(() => {
      const url = window.location.href;
      const split_url = url.split("/");
      const id = split_url[split_url.length - 1];
      setAuthorId(parseInt(id));
    }, []);
    return (
        <div className="d-flex flex-column align-items-center">
            <img className="p-2" src={authors[authorId].image} alt="Author Image"/>
            <h2 className="p-2">{authors[authorId].name}</h2>
            <ul className="list-group">
                <li className="list-group-item">Works: {authors[authorId].works}</li>
                <li className="list-group-item">Biography/Spotlight: {authors[authorId].bio}</li>
                <li className="list-group-item">On Tour: {authors[authorId].onTour ? "True" : "False"}</li>
            </ul>      
            <a href="#!" className="btn btn-primary">Link to Page?</a>
        </div>
    );
}

export default AuthorInstance;
