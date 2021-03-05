import React, { useEffect, useState } from "react";
const authors: Author[] = [
    { id: "0", 
    name: "J.K. Rowling", 
    works: "Harry Potter and the Sorcerer’s Stone, Harry Potter and the Deathly Hallows, Harry Potter and the Half-Blood Prince, Harry Potter and the Order of the Phoenix, Harry Potter and the Goblet of Fire, Harry Potter and the Prisoner of Azkaban, Harry Potter and the Chamber of Secrets", 
    bio: "J. K. Rowling was born in the summer of 1965 at Yate General Hospital in England and grew up in Chepstow, Gwent.  She left Chepstow for Exeter University, where she earned a French and Classics degree. As a postgraduate she moved to London to work at Amnesty International, doing research into human rights abuses in Francophone Africa. She started writing the Harry Potter series during a Manchester to London King’s Cross train journey, and during the next five years, outlined the plots for each book and began writing the first novel.  She then moved to northern Portugal, where she taught English as a foreign language. She married in October 1992 and gave birth to her daughter Jessica in 1993. When her marriage ended, she returned to the UK to live in Edinburgh, where Harry Potter & the Philosopher’s Stone was eventually completed and in 1996 she received an offer of publication. The following summer the world was introduced to Harry Potter.  The Harry Potter series is distributed in over 200 territories and has been translated into 65 languages.",
    onTour: false,
    image: "https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ed56d114231c70006c8f37b%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D0%26cropX2%3D654%26cropY1%3D96%26cropY2%3D750"},

    { id: "1", 
    name: "F. Scott Fitzgerald", 
    works: "The Great Gatsby, The Diamond as Big as the Ritz, The Beautiful and Damned, Tales of the Jazz Age, This Side of Paradise", 
    bio: "F. Scott Fitzgerald was considered the quintessential author of the Jazz Age. Born in St. Paul, Minnesota, in 1896, Fitzgerald attended Princeton University, where he began to write seriously. After joining the U.S. Army in 1917, Fitzgerald met Zelda Sayre, whom he later married. In 1920, Fitzgerald’s first novel, This Side of Paradise, transformed Fitzgerald overnight into a literary sensation. The Great Gatsby followed in 1925, although it was not as popular at the time as his second novel, The Beautiful and the Damned. Fitzgerald died in 1940 of a heart attack. He was forty-four years old.",
    onTour: false,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/F_Scott_Fitzgerald_1921.jpg"},

    { id: "2", 
    name: "John Steinbeck", 
    works: "La perla, East of Eden, Cannery Row, The Grapes of Wrath, Of Mice and Men, Travels with Charley in Search of America", 
    bio: "John Steinbeck, born in Salinas, California, in 1902, grew up in a fertile agricultural valley, about 25 miles from the Pacific Coast. Both the valley and the coast would serve as settings for some of his best fiction. In 1919 he went to Stanford University, where he intermittently enrolled in literature and writing courses until he left in 1925 without taking a degree. During the next five years he supported himself as a laborer and journalist in New York City, all the time working on his first novel, Cup of Gold (1929). After marriage and a move to Pacific Grove, he published two California books, The Pastures of Heaven (1932) and To a God Unknown (1933), and worked on short stories later collected in The Long Valley (1938). Popular success and financial security came only with Tortilla Flat (1935), stories about Monterey’s paisanos. A ceaseless experimenter throughout his career, Steinbeck changed courses regularly. Three powerful novels of the late 1930s focused on the California laboring class: In Dubious Battle (1936), Of Mice and Men (1937), and the book considered by many his finest, The Grapes of Wrath (1939). The Grapes of Wrath won both the National Book Award and the Pulitzer Prize in 1939. Steinbeck received the Nobel Prize in Literature in 1962, and, in 1964, he was presented with the United States Medal of Freedom by President Lyndon B. Johnson. Steinbeck died in New York in 1968. Today, more than 30 years after his death, he remains one of America’s greatest writers and cultural figures.",
    onTour: false,
    image: "https://images1.penguinrandomhouse.com/author/29649"},
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
