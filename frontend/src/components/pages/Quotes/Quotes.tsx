import React, { Component } from 'react';
import QuoteItem from "../../templates/Grid/items/QuoteItem";
import Pagination from '../../templates/Pagination';
import axios from 'axios'

class Quotes extends Component {
  state = { allQuotes: [], currQuotes: [], currentPage: null, totalPages: null }

  componentDidMount() {
    axios.get("/api/quotes")
      .then((res: { data: any; }) => {
        const allQuotes = res.data.quotes;
        this.setState({ allQuotes });
      })
  }
  onPageChanged = (data: { currentPage: any; totalPages: any; pageLimit: any; }) => {
    const { allQuotes } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currQuotes = allQuotes.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currQuotes, totalPages });
  }
  render() {
    const { allQuotes, currQuotes, currentPage, totalPages } = this.state;
    const totalBooks = allQuotes.length;
    if (totalBooks === 0) return null;

    const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();

    return (
      <div className="container mb-5">
        <div className="row d-flex flex-row py-5">
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <h2 className={headerClass}>
                <strong className="text-secondary">{totalBooks}</strong> Quotes
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
          { currQuotes.map(quote => <QuoteItem item={quote} />) }
        </div>
      </div>
    );
  }
}

export default Quotes;