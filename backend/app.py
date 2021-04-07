import json
from flask import Flask, render_template, jsonify
from models import Book, Author, Quote, BookSchema, AuthorSchema, QuoteSchema
from init import app, db

# Initialize schemas
book_schema = BookSchema()
books_schema = BookSchema(many=True, exclude=['authors', 'quotes'])
author_schema = AuthorSchema()
authors_schema = AuthorSchema(many=True, exclude=['books', 'quotes'])
quote_schema = QuoteSchema()
quotes_schema = QuoteSchema(many=True, exclude=['books', 'author'])

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
    return jsonify({
        "book": book_schema.dump(book),
        "related_authors": authors_schema.dump(book.authors),
        "related_quotes": quotes_schema.dump(book.quotes)
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
