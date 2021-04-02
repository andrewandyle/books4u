from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY
from init import db, ma

# Books and Authors Association
books_to_authors = db.Table('books_to_authors',
    db.Column('book_id', db.Integer, db.ForeignKey('book.book_id')),
    db.Column('author_id', db.Integer, db.ForeignKey('author.author_id'))
)

# Books and Quotes Association
books_to_quotes = db.Table('books_to_quotes',
    db.Column('book_id', db.Integer, db.ForeignKey('book.book_id')),
    db.Column('quote_id', db.Integer, db.ForeignKey('quote.quote_id'))
)

# Book Model
class Book(db.Model):
    __tablename__ = 'book'
    book_id         = db.Column(db.Integer, primary_key=True)

    # Model Details
    name            = db.Column(db.String())
    author_names    = db.Column(ARRAY(db.String()))
    year            = db.Column(db.String())
    price           = db.Column(db.Float)
    page_count      = db.Column(db.Integer)

    # Instance Details
    description     = db.Column(db.String())
    genres          = db.Column(ARRAY(db.String()))
    avg_rating      = db.Column(db.Float)
    num_ratings     = db.Column(db.Integer)
    maturity_rating = db.Column(db.String())
    language        = db.Column(db.String())

    # Media
    image           = db.Column(db.String())
    purchase_link   = db.Column(db.String())

    # Associations
    authors         = db.relationship('Author', secondary=books_to_authors, backref=db.backref('books', lazy='dynamic'))
    quotes          = db.relationship('Quote', secondary=books_to_quotes, backref=db.backref('books', lazy='dynamic'))


# Author model
class Author(db.Model):
    __tablename__ = 'author'
    author_id           = db.Column(db.Integer, primary_key=True)

    # Model Details
    first_name          = db.Column(db.String())
    last_name           = db.Column(db.String())
    num_published_books = db.Column(db.Integer)
    occupation          = db.Column(db.String())
    avg_rating          = db.Column(db.Float)

    # Instance Details
    spotlight           = db.Column(db.String())
    bestsellers         = db.Column(db.Boolean)
    on_tour             = db.Column(db.Boolean)
    genres              = db.Column(ARRAY(db.String()))
    gender              = db.Column(db.String())

    # Media
    image               = db.Column(db.String())

    # Associations
    quotes              = db.relationship('Quote', backref='author')


# Quote model
class Quote(db.Model):
    __tablename__ = 'quote'
    quote_id            = db.Column(db.Integer, primary_key=True)

    # Model Details
    quote               = db.Column(db.String())
    author_name         = db.Column(db.String())
    length              = db.Column(db.Integer)
    num_unique_words    = db.Column(db.Integer)
    score               = db.Column(db.Float)

    # Instance Details
    tags                = db.Column(ARRAY(db.String()))
    language            = db.Column(db.String())
    num_syllables       = db.Column(db.Integer)
    most_common_words   = db.Column(ARRAY(db.String()))
    least_common_words  = db.Column(ARRAY(db.String()))

    # Media
    link                = db.Column(db.String())

    # Associations
    author_id           = db.Column(db.Integer, db.ForeignKey('author.author_id'))


class BookSchema(ma.Schema):
    class Meta:
        fields = (
            "book_id",
            "name",
            "author_names",
            "year",
            "price",
            "page_count",
            "description",
            "genres",
            "avg_rating",
            "num_ratings",
            "maturity_rating",
            "language",
            "image",
            "purchase_link", 
            "authors",
            "quotes",
        )

class AuthorSchema(ma.Schema):
    class Meta:
        fields = (
            "author_id",
            "first_name",
            "last_name",
            "num_published_books",
            "occupation",
            "avg_rating",
            "spotlight",
            "bestsellers",
            "on_tour",
            "genres",
            "gender",
            "image",
            "books",
            "quotes",
        )

class QuoteSchema(ma.Schema):
    class Meta:
        fields = (
            "quote_id",
            "quote",
            "author_name",
            "length",
            "num_unique_words",
            "score",
            "tags",
            "language",
            "num_syllables",
            "most_common_words",
            "least_common_words",
            "link",
            "author_id",
            "books",
            "author",
        )

db.create_all()
