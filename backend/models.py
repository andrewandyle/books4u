from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY
from init import db, ma
# db = SQLAlchemy()

###### MODELS ######

# Book Model


class Book(db.Model):
    __tablename__ = 'book'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    genres = db.Column(ARRAY(db.String()))
    year = db.Column(db.String())
    page_count = db.Column(db.Integer)
    price = db.Column(db.Float)
    avg_rating = db.Column(db.Float)
    num_ratings = db.Column(db.Integer)
    maturity_rating = db.Column(db.String())
    language = db.Column(db.String())

    description = db.Column(db.String())
    image = db.Column(db.String())
    purchase_link = db.Column(db.String())

    # authors association
    authors = db.relationship('Author', secondary='books_to_authors')

# Author model


class Author(db.Model):
    __tablename__ = 'author'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String())
    last_name = db.Column(db.String())
    on_tour = db.Column(db.Boolean)
    awards = db.Column(db.Boolean)
    bestsellers = db.Column(db.Boolean)
    birthday = db.Column(db.String())
    date_of_death = db.Column(db.String())
    genres = db.Column(ARRAY(db.String()))
    occupation = db.Column(db.String())

    spotlight = db.Column(db.String())
    image = db.Column(db.String())

    # books association
    # quotes association
    books = db.relationship('Book', secondary='books_to_authors')
    # quotes = db.relationship("Quote", backref="author")
    quotes = db.relationship('Quote', secondary='author_to_quotes')

# Quote model


class Quote(db.Model):
    __tablename__ = 'quote'
    id = db.Column(db.Integer, primary_key=True)
    quote = db.Column(db.String())
    length = db.Column(db.Integer)
    tags = db.Column(ARRAY(db.String()))
    category = db.Column(db.String())
    language = db.Column(db.String())
    unique_words = db.Column(db.Integer)
    num_syllables = db.Column(db.Integer)
    score = db.Column(db.Float)
    most_common_word = db.Column(ARRAY(db.String()))
    least_common_word = db.Column(ARRAY(db.String()))

    link = db.Column(db.String())
    background = db.Column(db.String())

    # author association
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'))
    author = db.relationship('Author', backref='quote')


class BooksToAuthors(db.Model):

    book_id = db.Column(db.Integer, db.ForeignKey('book.id'))
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'))


class BooksToQuotes(db.Model):
    __tablename__ = 'books_to_quotes'
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'))
    quote_id = db.Column(db.Integer, db.ForeignKey('quote.id'))


class AuthorToQuotes(db.Model):
    __tablename__ = 'author_to_quotes'
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'))
    quote_id = db.Column(db.Integer, db.ForeignKey('quote.id'))


class BookSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "name",
            "genres",
            "year",
            "page_count",
            "price",
            "avg_rating",
            "num_ratings",
            "maturity_rating",
            "language",
            "description",
            "image",
            "purchase_link",
            "authors"
        )

class AuthorSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "first_name",
            "last_name",
            "on_tour",
            "bestsellers",
            "birthday",
            "date_of_death",
            "genres",
            "occupation",
            "spotlight",
            "image"
        )

class QuoteSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "quote",
            "length",
            "tags",
            "category",
            "language",
            "unique_words",
            "num_syllables",
            "score",
            "most_common_word",
            "least_common_word",
            "link",
            "background",
        )
