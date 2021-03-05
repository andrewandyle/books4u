import React, { useEffect, useState } from "react";
const books: Book[] = [
    { id: "0", 
    image: "https://books.google.com/books/content/images/frontcover/wrOQLV6xB-wC?fife=w200-h300", 
    author: "J.K. Rowling",
    title: "Harry Potter and the Sorcerer's Stone",
    genre: "Fiction, Fantasy, Contemporary",
    year: "2015",
    description: "Turning the envelope over, his hand trembling, Harry saw a purple wax seal bearing a coat of arms; a lion, an eagle, a badger and a snake surrounding a large letter 'H'. Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!",
    pageCount: "309",
    price: "9.99",
    buyLink: "https://play.google.com/store/books/details?id=wrOQLV6xB-wC&rdid=book-wrOQLV6xB-wC&rdot=1&source=gbs_atb&pcampaignid=books_booksearch_atb"},

    { id: "1", 
    image: "https://books.google.com/books/publisher/content/images/frontcover/sBoZEAAAQBAJ?fife=w200-h300", 
    author: "F. Scott Fitzgerald",
    title: "The Great Gatsby",
    genre: "Fiction, Classics",
    year: "2021",
    description: "The Great Gatsby is a novel that needs no introduction for a certain generation of American readers. Long taught as required reading in American schools, critics have consistently held it up alongside Moby Dick, Huck Finn, and To Kill a Mockingbird as perhaps the quintessential Great American Novel. Nick Carraway is a young Midwestern man freshly arrived in New York to make his fortune. He rents a shabby apartment in Long Island next door to a sumptuous mansion: the home of the mysterious and wealthy Jay Gatsby. Carraway spends time catching up with his distant cousin Daisy and her industry-baron husband Tom before being invited to one of Gatsby’s wildly lavish weekend parties. There he meets Jordan, a flapper and a golf star, and an intricate web of romances and betrayals begins to unfold. The novel is a colorful study of America’s Jazz Age—a term said to be coined by Fitzgerald himself—complete with wealthy socialites living in hedonistic abandon, libertine flappers, jazz bands, roaring roadsters, and greasy speakeasies populated with shady grifters. Contrasted against the glamorous lives of wealthy socialites is the entrenched lower class, who live in gray, dingy squalor among smoldering ash-heaps. Fitzgerald uses the setting to examine the American Dream: the idea that anyone in America can achieve success through hard work and dedication. Gatsby has spent his life reaching for his dream. Some say he’s already achieved it. But has he? Is the dream even real for the hard-working poor that Gatsby and Tom race past in their glittering cars on the way to the decadent city? Fitzgerald wrote much of his real life into the novel. Like Carraway, he was a Midwesterner educated at an Ivy-league school who went to live on Long Island. Despite his meager finances he hobnobbed with socialites, and spent his career struggling for money to maintain the grand style his romantic interests were accustomed to. The cover art, titled Celestial Eyes, was commissioned from Francis Cugat, who completed it before the novel was finished. The huge eyes gazing down on the blazing city so moved Fitzgerald that he wrote them into the story. Fitzgerald saw the novel as a purely artistic work, free of the pulp pandering required by his shorter commissions—but despite that, contemporary reviews were mixed, and it sold poorly. Fitzgerald thought it a failure, and died believing the novel to be fatally obscure. Only during World War II did it come back to the public consciousness, buoyed by the support of a ring of writers and critics and printed as an Armed Service Edition to be sent to soldiers on the front. Now it is an American classic.",
    pageCount: "169",
    price: "0.00",
    buyLink: "https://play.google.com/store/books/details/F_Scott_Fitzgerald_The_Great_Gatsby?id=sBoZEAAAQBAJ"},

    { id: "2", 
    image: "https://books.google.com/books/content/images/frontcover/ClXiwSYzjtYC?fife=w200-h300", 
    author: "John Steinbeck",
    title: "The Grapes of Wrath",
    genre: "Fiction",
    year: "2006",
    description: "First published in 1939, Steinbeck’s Pulitzer Prize-winning epic of the Great Depression chronicles the Dust Bowl migration of the 1930s and tells the story of one Oklahoma farm family, the Joads—driven from their homestead and forced to travel west to the promised land of California. Out of their trials and their repeated collisions against the hard realities of an America divided into Haves and Have-Nots evolves a drama that is intensely human yet majestic in its scale and moral vision, elemental yet plainspoken, tragic but ultimately stirring in its human dignity. A portrait of the conflict between the powerful and the powerless, of one man’s fierce reaction to injustice, and of one woman’s stoical strength, the novel captures the horrors of the Great Depression and probes into the very nature of equality and justice in America. At once a naturalistic epic, captivity narrative, road novel, and transcendental gospel, Steinbeck’s powerful landmark novel is perhaps the most American of American Classics.",
    pageCount: "544",
    price: "12.99",
    buyLink: "https://play.google.com/store/books/details/John_Steinbeck_The_Grapes_of_Wrath?id=ClXiwSYzjtYC"},
];

interface Book {
  id: string;
  image: string;
  author: string;
  title: string;
  genre: string;
  year: string;
  description: string;
  pageCount: string;
  price: string;
  buyLink: string;
}

function BookInstance() {
    const [bookId, setBookId] = useState(0);
    useEffect(() => {
        const url = window.location.href;
        const split_url = url.split("/");
        const id = split_url[split_url.length - 1];
        setBookId(parseInt(id));
    }, []);
    return (
    <div className="d-flex flex-column align-items-center">
        <img className="p-2" src={books[bookId].image} alt="Book Image"/>
        <h2 className="p-2">{books[bookId].title}</h2>
        <ul className="list-group">
            <li className="list-group-item">Author: {books[bookId].author}</li>
            <li className="list-group-item">Genre: {books[bookId].genre}</li>
            <li className="list-group-item">Publishing Year: {books[bookId].year}</li>
            <li className="list-group-item">{books[bookId].description}</li>
            <li className="list-group-item">Page Count: {books[bookId].pageCount}</li>
            <li className="list-group-item">Price: ${books[bookId].price}</li>
            <li className="list-group-item">{books[bookId].year}</li>
        </ul>
        <a href={books[bookId].buyLink} className="btn btn-primary">Buy</a>
    </div>
  );
}

export default BookInstance;
