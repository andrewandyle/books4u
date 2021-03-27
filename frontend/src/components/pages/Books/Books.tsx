import React, { Component } from 'react';
import BookItem from "../../templates/Grid/items/BookItem";
import Pagination from '../../templates/Pagination';
import axios from 'axios'

class Books extends Component {
  state = { allBooks: [], currBooks: [], currentPage: null, totalPages: null }

  componentDidMount() {
    axios.get("/api/books")
      .then((res: { data: any; }) => {
        const allBooks = res.data.books;
        this.setState({ allBooks });
      })
  }
  onPageChanged = (data: { currentPage: any; totalPages: any; pageLimit: any; }) => {
    const { allBooks } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currBooks = allBooks.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currBooks, totalPages });
  }
  render() {
    const { allBooks, currBooks, currentPage, totalPages } = this.state;
    const totalBooks = allBooks.length;
    if (totalBooks === 0) return null;

    const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();

    return (
      <div className="container mb-5">
        <div className="row d-flex flex-row py-5">
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <h2 className={headerClass}>
                <strong className="text-secondary">{totalBooks}</strong> Books
              </h2>
              { currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                </span>
              ) }
            </div>
            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination totalRecords={totalBooks} pageLimit={18} pageNeighbours={1} onPageChanged={this.onPageChanged} />
            </div>
          </div>
          { currBooks.map(book => <BookItem item={book} />) }
        </div>
      </div>
    );
  }
}

export default Books;