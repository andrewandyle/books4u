import React from "react";
import useAxios from "axios-hooks";
import Loading from "../../Loading";
import BookItem from "../../templates/Grid/items/BookItem";
import QuoteItem from "../../templates/Grid/items/QuoteItem";

function AuthorInstance() {
  const url = window.location.href;
  const split_url = url.split("/");
  const id = split_url[split_url.length - 1];
  const [{ data, loading }] = useAxios(`/api/author/${id}`);
  const [{ data: bookData, loading: bookLoading }] = useAxios("/api/books");
  const [{ data: quoteData, loading: quoteLoading }] = useAxios("/api/quotes");

  const getListOfBookIds = () =>
    data.book_ids.map((book_obj: any) => book_obj.book_id);

  const getListOfQuoteIds = () =>
    data.quote_ids.map((quote_obj: any) => quote_obj.quote_id);

  return loading ? (
    <Loading />
  ) : (
    <div className="container d-flex flex-column align-items-center">
      <img className="p-2" src={data.author.image} alt="Author" />
      <h2 className="p-2">
        {data.author.first_name} {data.author.last_name}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: data.author.spotlight }}></div>
      <ul className="list-group">
        <li className="list-group-item">
          On Tour: {data.author.on_tour ? "True" : "False"}
        </li>
      </ul>
      <br />
      <h2>
        {data.author.first_name} {data.author.last_name}'s Books
      </h2>
      {bookLoading ? (
        <Loading />
      ) : (
        <div className="row d-flex flex-row py-5" style={{ width: "100%" }}>
          {bookData.books
            .filter((book: any) => getListOfBookIds().includes(book.id))
            .map((book: any) => (
              <BookItem item={book} excludeAuthor />
            ))}
        </div>
      )}
      <h2>
        {data.author.first_name} {data.author.last_name}'s Quotes
      </h2>
      {quoteLoading ? (
        <Loading />
      ) : (
        <div className="row d-flex flex-row py-5" style={{ width: "100%" }}>
          {quoteData.quotes
            .filter((quote: any) => getListOfQuoteIds().includes(quote.id))
            .map((quote: any) => (
              <QuoteItem item={quote} />
            ))}
        </div>
      )}
    </div>
  );
}

export default AuthorInstance;
