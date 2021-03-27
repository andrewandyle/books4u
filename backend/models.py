from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY
from init import db, ma
# db = SQLAlchemy()

###### MODELS ######


# Book Model
class Book(db.Model):
    __tablename__ = 'book'
    id              = db.Column(db.Integer, primary_key=True)
    name            = db.Column(db.String())
    genres          = db.Column(ARRAY(db.String()))
    year            = db.Column(db.String())
    page_count      = db.Column(db.Integer)
    price           = db.Column(db.Float)
    avg_rating      = db.Column(db.Float)
    num_ratings     = db.Column(db.Integer)
    maturity_rating = db.Column(db.String())
    language        = db.Column(db.String())
    authors         = db.Column(ARRAY(db.String()))

    description     = db.Column(db.String())
    image           = db.Column(db.String())
    purchase_link   = db.Column(db.String())

    # authors association
    author_ids      = db.relationship('Author', secondary='books_to_authors')


# Author model
class Author(db.Model):
    __tablename__ = 'author'
    id                  = db.Column(db.Integer, primary_key=True)
    first_name          = db.Column(db.String())
    last_name           = db.Column(db.String())
    on_tour             = db.Column(db.Boolean)
    bestsellers         = db.Column(db.Boolean)
    genres              = db.Column(ARRAY(db.String()))
    occupation          = db.Column(db.String())
    num_published_books = db.Column(db.Integer)
    avg_rating          = db.Column(db.Float)
    gender              = db.Column(db.String())
    birthday            = db.Column(db.String())
    date_of_death       = db.Column(db.String())

    spotlight           = db.Column(db.String())
    image               = db.Column(db.String())

    book_ids            = db.relationship('Book', secondary='books_to_authors')
    quote_ids           = db.relationship('Quote', secondary='author_to_quotes')


# Quote model
class Quote(db.Model):
    __tablename__ = 'quote'
    id                  = db.Column(db.Integer, primary_key=True)
    author              = db.Column(db.String())
    length              = db.Column(db.Integer)
    tags                = db.Column(ARRAY(db.String()))
    language            = db.Column(db.String())
    num_unique_words        = db.Column(db.Integer)
    num_syllables       = db.Column(db.Integer)
    score               = db.Column(db.Float)
    most_common_words   = db.Column(ARRAY(db.String()))
    least_common_words  = db.Column(ARRAY(db.String()))

    quote               = db.Column(db.String())
    link                = db.Column(db.String())

    author_id           = db.Column(db.Integer, db.ForeignKey('author.id'))
    

class BooksToAuthors(db.Model):
    __tablename__ = 'books_to_authors'
    book_id     = db.Column(db.Integer, db.ForeignKey('book.id'), primary_key = True)
    author_id   = db.Column(db.Integer, db.ForeignKey('author.id'), primary_key = True)


class BooksToQuotes(db.Model):
    __tablename__ = 'books_to_quotes'
    book_id     = db.Column(db.Integer, db.ForeignKey('book.id'), primary_key = True)
    quote_id    = db.Column(db.Integer, db.ForeignKey('quote.id'), primary_key = True)


class AuthorToQuotes(db.Model):
    __tablename__ = 'author_to_quotes'
    author_id   = db.Column(db.Integer, db.ForeignKey('author.id'), primary_key = True)
    quote_id    = db.Column(db.Integer, db.ForeignKey('quote.id'), primary_key = True)


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
            "authors",
            "description",
            "image",
            "purchase_link", 
        )

class AuthorSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "first_name",
            "last_name",
            "on_tour",
            "bestsellers",
            "genres",
            "occupation",
            "num_published_books",
            "avg_rating",
            "gender",
            "birthday",
            "date_of_death",
            "spotlight",
            "image"
        )

class QuoteSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "quote",
            "length",
            "author",
            "tags",
            "language",
            "num_unique_words",
            "num_syllables",
            "score",
            "most_common_words",
            "least_common_words",
            "link",
            "background",
            "author_id"
        )

db.create_all()
