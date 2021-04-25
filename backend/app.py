import json
from flask import Flask, render_template, jsonify, request
from sqlalchemy import or_, nullslast
from models import Book, Author, Quote, BookSchema, AuthorSchema, QuoteSchema
from init import app, db

# Initialize schemas
book_schema = BookSchema()
books_schema = BookSchema(many=True, exclude=['authors', 'quotes'])
author_schema = AuthorSchema()
authors_schema = AuthorSchema(many=True, exclude=['books', 'quotes'])
authors_schema_with_books = AuthorSchema(many=True, exclude=['quotes'])
quote_schema = QuoteSchema()
quotes_schema = QuoteSchema(many=True, exclude=['books', 'author'])

@app.route("/", defaults = {"path" : ""})
@app.route("/")
def index():
    return render_template("index.html")

@app.route('/api/books', methods=["GET"])
def get_books():
    # Range Queries
    rng_query_filters = {'year', 'avg_rating', 'page_count', 'price'}
    # Array Queries
    arr_query_filters = {'genres'}
    filters = []
    args = request.args
    sort_by = None
    for arg in args:
        if arg in rng_query_filters:
            lower_bound, upper_bound = args[arg].split('-')
            filters.append(getattr(Book, arg).between(lower_bound, upper_bound))
        elif arg in arr_query_filters:
            genre_filters = []
            for genre in args[arg].split(','):
                genre_filters.append(getattr(Book, arg).any(genre))
            filters.append(or_(*genre_filters))
        elif arg == "sort_by":
            sort_attr, order = args[arg].split('-')
            sort_by = nullslast(getattr(Book, sort_attr).desc()) if order == 'D' else nullslast(getattr(Book, sort_attr))
    all_books = Book.query.filter(*filters).order_by(sort_by).all()
    books_list = books_schema.dump(all_books)
    return jsonify({"results": len(books_list), "books": books_list})


@app.route('/api/authors', methods=["GET"])
def get_authors():
    all_authors = Author.query.all()
    authors_list = authors_schema.dump(all_authors)
    return jsonify({"results": len(authors_list), "authors": authors_list})


@app.route('/api/quotes', methods=["GET"])
def get_quotes():
    # Range Queries
    rng_query_filters = {'length', 'num_unique_words', 'num_syllables', 'score'}
    # Array Queries
    arr_query_filters = {'language'}
    filters = []
    args = request.args
    sort_by = None
    for arg in args:
        if arg in rng_query_filters:
            # Score is an edge case, we don't split with hyphen because score can be negative
            if arg == "score":
                lower_bound, upper_bound = args[arg].split(':')
                filters.append(getattr(Quote, arg).between(lower_bound, upper_bound))
            else:
                lower_bound, upper_bound = args[arg].split('-')
                filters.append(getattr(Quote, arg).between(lower_bound, upper_bound))
        elif arg in arr_query_filters:
            language_filters = []
            for language in args[arg].split(','):
                language_filters.append(getattr(Quote, arg) == language)
            filters.append(or_(*language_filters))
        elif arg == "sort_by":
            sort_attr, order = args[arg].split('-')
            sort_by = nullslast(getattr(Quote, sort_attr).desc()) if order == 'D' else nullslast(getattr(Quote, sort_attr))
    all_quotes = Quote.query.filter(*filters).order_by(sort_by).all()
    quotes_list = quotes_schema.dump(all_quotes)
    return jsonify({"results": len(quotes_list), "quotes": quotes_list})


@app.route('/api/book/<id>', methods=["GET"])
def get_book(id):
    book = Book.query.get(id)
    related_authors = authors_schema_with_books.dump(book.authors)
    related_books = []
    for author in related_authors:
        # Query for author again in order to get the actual book objects
        # Books usually have 1-3 authors, so not running too many additional queries
        author_query = Author.query.get(author['author_id'])
        author_books = books_schema.dump(author_query.books)
        for other_book in author_books:
            # Retrieve other books from the author that aren't the current book
            if other_book['book_id'] != int(id):
                related_books.append(other_book)
    return jsonify({
        "book": book_schema.dump(book),
        "related_authors": related_authors,
        "related_quotes": quotes_schema.dump(book.quotes),
        "related_books": related_books
    })


@app.route('/api/author/<id>', methods=["GET"])
def get_author(id):
    author = Author.query.get(id)
    return jsonify({
        "author": author_schema.dump(author),
        "related_books": books_schema.dump(author.books),
        "related_quotes": quotes_schema.dump(author.quotes)
    })


@app.route('/api/quote/<id>', methods=["GET"])
def get_quote(id):
    quote = Quote.query.get(id)
    return jsonify({
        "quote": quote_schema.dump(quote),
        "related_author": author_schema.dump(quote.author),
        "related_books": books_schema.dump(quote.books)
    })


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=80, threaded=True, debug=True)
