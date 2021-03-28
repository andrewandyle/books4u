import json
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from models import Book, Author, Quote, BooksToAuthors, BooksToQuotes, AuthorsToQuotes, BookSchema, AuthorSchema, QuoteSchema, BooksToAuthorsSchema, BooksToQuotesSchema, AuthorsToQuotesSchema
from init import app

book_schema = BookSchema()
books_schema = BookSchema(many=True)
author_schema = AuthorSchema()
authors_schema = AuthorSchema(many=True)
quote_schema = QuoteSchema()
quotes_schema = QuoteSchema(many=True)
books_to_authors_schema = BooksToAuthorsSchema(many=True)
books_to_quotes_schema = BooksToQuotesSchema(many=True)
authors_to_quotes_schema = AuthorsToQuotesSchema(many=True)


@app.route("/")
def index():
    return render_template("index.html")


@app.route('/api/books', methods=["GET"])
def get_books():
    all_books = Book.query.all()
    return jsonify({"books": books_schema.dump(all_books)})


@app.route('/api/authors', methods=["GET"])
def get_authors():
    all_authors = Author.query.all()
    return jsonify({"authors": authors_schema.dump(all_authors)})


@app.route('/api/quotes', methods=["GET"])
def get_quotes():
    all_quotes = Quote.query.all()
    return jsonify({"quotes": quotes_schema.dump(all_quotes)})


@app.route('/api/book/<id>', methods=["GET"])
def get_book(id):
    book = Book.query.get(id)
    connected_author_ids = BooksToAuthors.query.filter_by(book_id=id)
    connected_quote_ids = BooksToQuotes.query.filter_by(book_id=id)
    return jsonify({"book": book_schema.dump(book), "author_ids": books_to_authors_schema.dump(connected_author_ids), "quote_ids": books_to_quotes_schema.dump(connected_quote_ids)})


@app.route('/api/author/<id>', methods=["GET"])
def get_author(id):
    author = Author.query.get(id)
    connected_book_ids = BooksToAuthors.query.filter_by(author_id=id)
    connected_quote_ids = AuthorsToQuotes.query.filter_by(author_id=id)
    return jsonify({"author": author_schema.dump(author), "book_ids": books_to_authors_schema.dump(connected_book_ids), "quote_ids": authors_to_quotes_schema.dump(connected_quote_ids)})


@app.route('/api/quote/<id>', methods=["GET"])
def get_quote(id):
    quote = Quote.query.get(id)
    connected_book_ids = BooksToQuotes.query.filter_by(quote_id=id)
    return jsonify({"quote": quote_schema.dump(quote), "book_ids": books_to_quotes_schema.dump(connected_book_ids)})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=80, threaded=True, debug=True)
