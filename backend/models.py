from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
from init import db

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


# Book Schema
class BookSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Book
        include_relationships = True
        load_instance = True

# Author Schema
class AuthorSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Author
        include_relationships = True
        load_instance = True

# Quote Schema
class QuoteSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Quote
        include_relationships = True
        load_instance = True

db.create_all()
