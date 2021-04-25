from app import app
import unittest

class FlaskTest(unittest.TestCase):
    
    # Books

    def test_books_status_code(self):
        tester = app.test_client(self)
        response = tester.get("/api/books")
        self.assertEqual(response.status_code, 200)

    def test_books_content_type(self):
        tester = app.test_client(self)
        response = tester.get("/api/books")
        self.assertEqual(response.content_type, "application/json")

    def test_books_response_key(self):
        tester = app.test_client(self)
        response = tester.get("/api/books")
        response_dict = response.json
        self.assertEqual(set(response_dict), {'results', 'books'})

    def test_book_status_code(self):
        tester = app.test_client(self)
        response = tester.get("/api/book/0")
        self.assertEqual(response.status_code, 200)

    def test_book_content_type(self):
        tester = app.test_client(self)
        response = tester.get("/api/book/0")
        self.assertEqual(response.content_type, "application/json")

    def test_book_response_keys(self):
        tester = app.test_client(self)
        response = tester.get("/api/book/0")
        response_dict = response.json
        self.assertEqual(set(response_dict), {'book', 'related_authors', 'related_quotes', 'related_books'})

    # Authors

    def test_authors_status_code(self):
        tester = app.test_client(self)
        response = tester.get("/api/authors")
        self.assertEqual(response.status_code, 200)

    def test_authors_content_type(self):
        tester = app.test_client(self)
        response = tester.get("/api/authors")
        self.assertEqual(response.content_type, "application/json")

    def test_authors_response_key(self):
        tester = app.test_client(self)
        response = tester.get("/api/authors")
        response_dict = response.json
        self.assertEqual(set(response_dict), {'results', 'authors'})

    def test_author_status_code(self):
        tester = app.test_client(self)
        response = tester.get("/api/author/0")
        self.assertEqual(response.status_code, 200)

    def test_author_content_type(self):
        tester = app.test_client(self)
        response = tester.get("/api/author/0")
        self.assertEqual(response.content_type, "application/json")

    def test_author_response_keys(self):
        tester = app.test_client(self)
        response = tester.get("/api/author/0")
        response_dict = response.json
        self.assertEqual(set(response_dict), {'author', 'related_books', 'related_quotes'})

    # Quotes

    def test_quotes_status_code(self):
        tester = app.test_client(self)
        response = tester.get("/api/quotes")
        self.assertEqual(response.status_code, 200)

    def test_quotes_content_type(self):
        tester = app.test_client(self)
        response = tester.get("/api/quotes")
        self.assertEqual(response.content_type, "application/json")

    def test_quotes_response_key(self):
        tester = app.test_client(self)
        response = tester.get("/api/quotes")
        response_dict = response.json
        self.assertEqual(set(response_dict), {'results', 'quotes'})

    def test_quote_status_code(self):
        tester = app.test_client(self)
        response = tester.get("/api/quote/0")
        self.assertEqual(response.status_code, 200)

    def test_quote_content_type(self):
        tester = app.test_client(self)
        response = tester.get("/api/quote/0")
        self.assertEqual(response.content_type, "application/json")

    def test_quote_response_keys(self):
        tester = app.test_client(self)
        response = tester.get("/api/quote/0")
        response_dict = response.json
        self.assertEqual(set(response_dict), {'quote', 'related_author', 'related_books'})

if __name__ == "__main__":
    unittest.main()
