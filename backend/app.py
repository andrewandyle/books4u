import json
from flask import Flask, request, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# DUMMY DATA
books = { "books":[
    {
    "id": "0",
    "image":
        "https://books.google.com/books/content/images/frontcover/wrOQLV6xB-wC?fife=w200-h300",
    "author": "J.K. Rowling",
    "title": "Harry Potter and the Sorcerer's Stone",
    "genre": "Fiction, Fantasy, Contemporary",
    "year": "2015",
    "description":
        "Turning the envelope over, his hand trembling, Harry saw a purple wax seal bearing a coat of arms; a lion, an eagle, a badger and a snake surrounding a large letter 'H'. Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!",
    "pageCount": "309",
    "price": "9.99",
    "buyLink":
        "https://play.google.com/store/books/details?id=wrOQLV6xB-wC&rdid=book-wrOQLV6xB-wC&rdot=1&source=gbs_atb&pcampaignid=books_booksearch_atb",
    },

    {
    "id": "1",
    "image":
        "https://books.google.com/books/publisher/content/images/frontcover/sBoZEAAAQBAJ?fife=w200-h300",
    "author": "F. Scott Fitzgerald",
    "title": "The Great Gatsby",
    "genre": "Fiction, Classics",
    "year": "2021",
    "description":
        "The Great Gatsby is a novel that needs no introduction for a certain generation of American readers. Long taught as required reading in American schools, critics have consistently held it up alongside Moby Dick, Huck Finn, and To Kill a Mockingbird as perhaps the quintessential Great American Novel. Nick Carraway is a young Midwestern man freshly arrived in New York to make his fortune. He rents a shabby apartment in Long Island next door to a sumptuous mansion: the home of the mysterious and wealthy Jay Gatsby. Carraway spends time catching up with his distant cousin Daisy and her industry-baron husband Tom before being invited to one of Gatsby’s wildly lavish weekend parties. There he meets Jordan, a flapper and a golf star, and an intricate web of romances and betrayals begins to unfold. The novel is a colorful study of America’s Jazz Age—a term said to be coined by Fitzgerald himself—complete with wealthy socialites living in hedonistic abandon, libertine flappers, jazz bands, roaring roadsters, and greasy speakeasies populated with shady grifters. Contrasted against the glamorous lives of wealthy socialites is the entrenched lower class, who live in gray, dingy squalor among smoldering ash-heaps. Fitzgerald uses the setting to examine the American Dream: the idea that anyone in America can achieve success through hard work and dedication. Gatsby has spent his life reaching for his dream. Some say he’s already achieved it. But has he? Is the dream even real for the hard-working poor that Gatsby and Tom race past in their glittering cars on the way to the decadent city? Fitzgerald wrote much of his real life into the novel. Like Carraway, he was a Midwesterner educated at an Ivy-league school who went to live on Long Island. Despite his meager finances he hobnobbed with socialites, and spent his career struggling for money to maintain the grand style his romantic interests were accustomed to. The cover art, titled Celestial Eyes, was commissioned from Francis Cugat, who completed it before the novel was finished. The huge eyes gazing down on the blazing city so moved Fitzgerald that he wrote them into the story. Fitzgerald saw the novel as a purely artistic work, free of the pulp pandering required by his shorter commissions—but despite that, contemporary reviews were mixed, and it sold poorly. Fitzgerald thought it a failure, and died believing the novel to be fatally obscure. Only during World War II did it come back to the public consciousness, buoyed by the support of a ring of writers and critics and printed as an Armed Service Edition to be sent to soldiers on the front. Now it is an American classic.",
    "pageCount": "169",
    "price": "0.00",
    "buyLink":
        "https://play.google.com/store/books/details/F_Scott_Fitzgerald_The_Great_Gatsby?id=sBoZEAAAQBAJ",
    },

    {
    "id": "2",
    "image":
        "https://books.google.com/books/content/images/frontcover/ClXiwSYzjtYC?fife=w200-h300",
    "author": "John Steinbeck",
    "title": "The Grapes of Wrath",
    "genre": "Fiction",
    "year": "2006",
    "description":
        "First published in 1939, Steinbeck’s Pulitzer Prize-winning epic of the Great Depression chronicles the Dust Bowl migration of the 1930s and tells the story of one Oklahoma farm family, the Joads—driven from their homestead and forced to travel west to the promised land of California. Out of their trials and their repeated collisions against the hard realities of an America divided into Haves and Have-Nots evolves a drama that is intensely human yet majestic in its scale and moral vision, elemental yet plainspoken, tragic but ultimately stirring in its human dignity. A portrait of the conflict between the powerful and the powerless, of one man’s fierce reaction to injustice, and of one woman’s stoical strength, the novel captures the horrors of the Great Depression and probes into the very nature of equality and justice in America. At once a naturalistic epic, captivity narrative, road novel, and transcendental gospel, Steinbeck’s powerful landmark novel is perhaps the most American of American Classics.",
    "pageCount": "544",
    "price": "12.99",
    "buyLink":
        "https://play.google.com/store/books/details/John_Steinbeck_The_Grapes_of_Wrath?id=ClXiwSYzjtYC",
    }]
}

authors = {"authors": [
    {
        "id": "0",
        "name": "J.K. Rowling",
        "works": "Harry Potter and the Sorcerer’s Stone",
        "bio":
        "J. K. Rowling was born in the summer of 1965 at Yate General Hospital in England and grew up in Chepstow, Gwent.  She left Chepstow for Exeter University, where she earned a French and Classics degree. As a postgraduate she moved to London to work at Amnesty International, doing research into human rights abuses in Francophone Africa. She started writing the Harry Potter series during a Manchester to London King’s Cross train journey, and during the next five years, outlined the plots for each book and began writing the first novel.  She then moved to northern Portugal, where she taught English as a foreign language. She married in October 1992 and gave birth to her daughter Jessica in 1993. When her marriage ended, she returned to the UK to live in Edinburgh, where Harry Potter & the Philosopher’s Stone was eventually completed and in 1996 she received an offer of publication. The following summer the world was introduced to Harry Potter.  The Harry Potter series is distributed in over 200 territories and has been translated into 65 languages.",
        "onTour": False,
        "image":
        "https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ed56d114231c70006c8f37b%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D0%26cropX2%3D654%26cropY1%3D96%26cropY2%3D750",
    },

    {
        "id": "1",
        "name": "F. Scott Fitzgerald",
        "works": "The Great Gatsby",
        "bio":
        "F. Scott Fitzgerald was considered the quintessential author of the Jazz Age. Born in St. Paul, Minnesota, in 1896, Fitzgerald attended Princeton University, where he began to write seriously. After joining the U.S. Army in 1917, Fitzgerald met Zelda Sayre, whom he later married. In 1920, Fitzgerald’s first novel, This Side of Paradise, transformed Fitzgerald overnight into a literary sensation. The Great Gatsby followed in 1925, although it was not as popular at the time as his second novel, The Beautiful and the Damned. Fitzgerald died in 1940 of a heart attack. He was forty-four years old.",
        "onTour": False,
        "image":
        "https://upload.wikimedia.org/wikipedia/commons/5/5c/F_Scott_Fitzgerald_1921.jpg",
    },

    {
        "id": "2",
        "name": "John Steinbeck",
        "works": "The Grapes of Wrath",
        "bio":
        "John Steinbeck, born in Salinas, California, in 1902, grew up in a fertile agricultural valley, about 25 miles from the Pacific Coast. Both the valley and the coast would serve as settings for some of his best fiction. In 1919 he went to Stanford University, where he intermittently enrolled in literature and writing courses until he left in 1925 without taking a degree. During the next five years he supported himself as a laborer and journalist in New York City, all the time working on his first novel, Cup of Gold (1929). After marriage and a move to Pacific Grove, he published two California books, The Pastures of Heaven (1932) and To a God Unknown (1933), and worked on short stories later collected in The Long Valley (1938). Popular success and financial security came only with Tortilla Flat (1935), stories about Monterey’s paisanos. A ceaseless experimenter throughout his career, Steinbeck changed courses regularly. Three powerful novels of the late 1930s focused on the California laboring class: In Dubious Battle (1936), Of Mice and Men (1937), and the book considered by many his finest, The Grapes of Wrath (1939). The Grapes of Wrath won both the National Book Award and the Pulitzer Prize in 1939. Steinbeck received the Nobel Prize in Literature in 1962, and, in 1964, he was presented with the United States Medal of Freedom by President Lyndon B. Johnson. Steinbeck died in New York in 1968. Today, more than 30 years after his death, he remains one of America’s greatest writers and cultural figures.",
        "onTour": False,
        "image": "https://images1.penguinrandomhouse.com/author/29649",
    }]
}

quotes = {"quotes": [
    {
    "id": "0",
    "text": "It does not do to dwell on dreams and forget to live.",
    "author": "J.K. Rowling",
    "length": "12",
    "tags": "dreams, life",
    "image":
        "https://books.google.com/books/content/images/frontcover/wrOQLV6xB-wC?fife=w200-h300",
    "work": "Harry Potter and the the Sorcer's Stone",
    },

    {
    "id": "1",
    "text":
        "So we beat on, boats against the current, borne back ceaselessly into the past.",
    "author": "F. Scott Fitzgerald",
    "length": "14",
    "tags": "book, inspirational",
    "image":
        "https://books.google.com/books/publisher/content/images/frontcover/sBoZEAAAQBAJ?fife=w200-h300",
    "work": "The Great Gatsby",
    },

    {
    "id": "2",
    "text":
        "And the little screaming fact that sounds through all history: repression works only to strengthen and knit the repressed.",
    "author": "John Steinbeck",
    "length": "19",
    "tags": "repression, strength",
    "image":
        "https://books.google.com/books/content/images/frontcover/ClXiwSYzjtYC?fife=w200-h300",
    "work": "The Grapes of Wrath",
    }]
}

@app.route("/")
def index():
    return {}

@app.route('/api/books', methods=["GET"])
def get_books():
    # get books from DB
    return books

@app.route('/api/authors', methods=["GET"])
def get_authors():
    # get authors from DB
    return authors

@app.route('/api/quotes', methods=["GET"])
def get_quotes():
    # get quotes from DB
    return quotes

@app.route('/api/book/id=<id>', methods=["GET"])
def get_book(id):
    # get book from DB
    return books["books"][int(id)]

@app.route('/api/author/id=<id>', methods=["GET"])
def get_author(id):
    # get author from DB
    return authors["authors"][int(id)]

@app.route('/api/quote/id=<id>', methods=["GET"])
def get_quote(id):
    # get quote from DB
    return quotes["quotes"][int(id)]

if __name__ == '__main__':
    app.run(port=80)