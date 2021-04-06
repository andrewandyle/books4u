import React, { useState } from "react";
import BookItem from "../../templates/Grid/items/BookItem";
import Pagination from "../../templates/Pagination";
import Loading from "../../features/Loading";
import useAxios from "axios-hooks";
import RadioBox from "./Sections/RadioBox"
import { Col, Card, Row } from 'antd';
import name from "./Sections/Datas"

function Books() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [{ data, loading }] = useAxios("/api/books");
  const [currentBooks, setCurrentBooks] = useState([]);
  const [Filters, setFilters] = useState({
    continents: [],
    price: []
})

  const onPageChanged = (paginationData) => {
    const { currentPage, totalPages, pageLimit } = paginationData;
    const offset = (currentPage - 1) * pageLimit;
    const currBooks = data.books.slice(offset, offset + pageLimit);
    setCurrentBooks(currBooks);
    setCurrentPage(currentPage);
    setTotalPages(totalPages);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const headerClass = [
    "text-dark py-2 pr-4 m-0",
    currentPage ? "border-gray border-right" : "",
  ]
    .join(" ")
    .trim();

  const getProducts = (variables) => {
    
  }
  const handleName = (value) => {
    const data = name;
    let array = [];

    for (let key in data) {
        // console.log(key)
        // console.log('value', value)
        if (data[key]._id === parseInt(value, 10)) {
            array = data[key].array;
        }
    }
    console.log('array', array)
    return array
  }

  const handleFilters = (filters, category) => {

    const newFilters = { ...Filters }

    newFilters[category] = filters
    console.log(filters)
    console.log(newFilters)
    if (category === "name") {
        let nameValues = handleName(filters)
        newFilters[category] = nameValues

    }

    // console.log(newFilters)

    // showFilteredResults(newFilters)
    setFilters(newFilters)
  }
  return loading ? (
    <Loading />
  ) : (
    <div className="container">
      <div className="row d-flex flex-row py-5">
        <h2>Discover Books</h2>
        <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <RadioBox
                    list = {name}
                    handleFilters={filters => handleFilters(filters, "name")}
                    />
                </Col>
        </Row>

        {currentBooks.map((book) => (
          <BookItem item={book} />
        ))}

        
        <div className="d-flex flex-row py-4 align-items-center justify-content-between">
          <h2 className={headerClass}>
            <strong className="text-secondary">{data.books.length}</strong>{" "}
            Results
          </h2>
          {currentPage && (
            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
              Page <span className="font-weight-bold">{currentPage}</span> /{" "}
              <span className="font-weight-bold">{totalPages}</span>
            </span>
          )}
          <Pagination
            totalRecords={data.books.length}
            pageLimit={30}
            pageNeighbours={1}
            onPageChanged={onPageChanged}
          />
        </div>
      </div>
    </div>
  );
}


export default Books;
