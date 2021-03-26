from app import app
import unittest

class FlaskTest(unittest.TestCase):
  def test_books_status_code(self):
    tester = app.test_client(self)
    response = tester.get("/api/books")
    self.assertEqual(response.status_code, 200)

  def test_books_content_type(self):
    tester = app.test_client(self)
    response = tester.get("/api/books")
    self.assertEqual(response.content_type, "application/json")

  def test_authors_status_code(self):
    tester = app.test_client(self)
    response = tester.get("/api/authors")
    self.assertEqual(response.status_code, 200)

  def test_authors_content_type(self):
    tester = app.test_client(self)
    response = tester.get("/api/authors")
    self.assertEqual(response.content_type, "application/json")

  def test_quotes_status_code(self):
    tester = app.test_client(self)
    response = tester.get("/api/quotes")
    self.assertEqual(response.status_code, 200)

  def test_quotes_content_type(self):
    tester = app.test_client(self)
    response = tester.get("/api/quotes")
    self.assertEqual(response.content_type, "application/json")

if __name__ == "__main__":
    unittest.main()
