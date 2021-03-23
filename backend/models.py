from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY

db = SQLAlchemy()

###### MODELS ######

# Book Model
class Book(db.Model):
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
    # authors relational


# Author model
class Author(db.Model):
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
    # books relational
    # quotes relational


# Quote model
class Quote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quote = db.Column(db.String())
    length = db.Column(db.Integer)
    author = db.Column(db.String())
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
    # author relational
