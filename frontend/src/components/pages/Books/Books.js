import React, { useState } from "react";
import BookItem from "../../templates/Grid/items/BookItem";
import Pagination from "../../templates/Pagination";
import Loading from "../../features/Loading";
import useAxios from "axios-hooks";
import RadioBox from "./Sections/RadioBox"
import CheckBox from "./Sections/CheckBox"
import { Col, Row, Select } from 'antd';
import SearchFeature from './Sections/SearchFeature';
import { title, genre, price, year, rating } from "./Sections/Datas";
import SortStyle from "./Sections/SortStyle.css"
import SliderStyle from "./Sections/SliderStyle.css"
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const { Option } = Select;

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

function Books() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [{ data, loading }] = useAxios("/api/books");
  const [currentBooks, setCurrentBooks] = useState([]);


  const [sortValue, setSortValue] = useState("default");
  const [SearchTerms, setSearchTerms] = useState("")
  const [Filters, setFilters] = useState({
    title: [],
    genre: [],
    price: [],
    year: [],
    rating:[]
})

  const [Price, setPrice] = useState([0,100])
  const updatePrice = (data) => {
    setPrice(data) 
    handleFilters(Price, "price")
  }

  const [Year, setYear] = useState([1800,2021])
  const updateYear = (data) => {
    setYear(data) 
    handleFilters(Year, "year")
  }


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

  // Sort function
  const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);
  
    const sortedItems = React.useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] === null) 
            return sortConfig.direction === 'ascending' ? -1 : 1;
          if (b[sortConfig.key] === null)
          return sortConfig.direction === 'ascending' ? 1 : -1;

          if (a[sortConfig.key] != null && b[sortConfig.key] != null) {
            if (a[sortConfig.key] < b[sortConfig.key]) {
              return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
              return sortConfig.direction === 'ascending' ? 1 : -1;
            }
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);
  
    const requestSort = (key) => {
      let direction = 'ascending';
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };
  
    return { items: sortedItems, requestSort, sortConfig };
  };
  // Todo: implement handleSortChange function for Sort
  function handleSortChange(value) {
    setSortValue(value);
  }


  // TODO: implement request data from backend with filter option
  const getProducts = (variables) => {
    
  }
  const showFilteredResults = (filters) => {

    const variables = {
      // do we need to pass any other attrubute?
        filters: filters
    }
    getProducts(variables)

  }
  const updateSearchTerms = (newSearchTerm) => {

    const variables = {
        filters: Filters,
        searchTerm: newSearchTerm
    }
    console.log("variable",variables)
    setSearchTerms(newSearchTerm)

    getProducts(variables)
  }
  const handleCategory = (value, category) => {
    let data = title;
    if (category === "price")
      data = price;
    else if (category === "genre")
      data = genre;
    else if (category === "year")
      data = year;
    else if (category === "rating")
      data = rating;
    
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
    console.log("filter",filters)
    console.log("newFilter",newFilters)
    if (category === "title") {
      let titleValues = handleCategory(filters, category)
      newFilters[category] = titleValues
    }
    
    // if (category === "title") {
    //     let titleValues = handleTitle(filters, category)
    //     newFilters[category] = titleValues
    // } else if (category === "price") {
    //   let priceValues = handlePrice(filters)
    //   newFilters[category] = priceValues
    // } else if (category === "genre") {
    //   let genreValues = handleGenre(filters)
    //   newFilters[category] = genreValues
    // } else if (category === " ") {
    //   let genreValues = handleGenre(filters)
    //   newFilters[category] = genreValues
    // } 
    console.log(newFilters)
    // showFilteredResults(newFilters)
    setFilters(newFilters)

  }


  //console.log(currentBooks)
  // Sort functions
  const { items, requestSort, sortConfig } = useSortableData(currentBooks);
    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="container">
      <div className="row d-flex flex-row py-5">
        <h2>Discover Books</h2>
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            <CheckBox
            name = "Genres"
            list = {genre}
            handleFilters={filters => handleFilters(filters, "genre")}
            />
          </Col>

          <Col lg={12} xs={24}>
            <CheckBox
            name = "Rating"
            list = {rating}
            handleFilters={filters => handleFilters(filters, "rating")}
            />
          </Col>

          <Col lg={12} xs={24}>
            <RadioBox
            name = "Title"
            list = {title}
            handleFilters={filters => handleFilters(filters, "title")}
            />
          </Col>

          {/* <Col lg={12} xs={24}>
            <CheckBox
            name = "Year"
            list = {year}
            handleFilters={filters => handleFilters(filters, "year")}
            />
          </Col> */}
          <Col lg={12} xs={24}>
            Year
            <Range
              marks={{
                1800: `1800`,
                2021: `Present`
              }}
              min={1800}
              max={2021}
              defaultValue={[1800, 2021]}
              value = {Year}
              onChange = {updateYear}
              tipFormatter={value => `${value}`}
              tipProps={{
                placement: "top",
                visible: true
              }}
            />
          </Col>

          {/* <Col lg={12} xs={24}>
            <RadioBox
            name = "Price"
            list = {price}
            handleFilters={filters => handleFilters(filters, "price")}
            />
          </Col> */}
          <Col lg={12} xs={24}>
            Price
            <Range
              marks={{
                0: `$ 0`,
                100: `$ 100`
              }}
              min={0}
              max={100}
              defaultValue={[0, 100]}
              value = {Price}
              onChange = {updatePrice}
              tipFormatter={value => `$ ${value}`}
              tipProps={{
                placement: "top",
                visible: true
              }}

            />
          </Col>


                
                {/* <Col lg={12} xs={24}>
                  <select value={sortValue} style={{ width: 120 }} onChange={handleSortChange}>
                    <option value="default">Default</option>
                    <option value="title_ascending">Title Ascending</option>
                    <option value="title_descending">Title Descending</option>
                    <option value="rating_ascending">Rating Ascending</option>
                    <option value="rating_descending">Rating Descending</option>
                  </select>
                </Col> */}
        </Row>
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>

                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />
        </div>

        <h3>Sorts</h3>
        <thead>
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort('name')}
                className={getClassNamesFor('name')}
              >
                Name
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('price')}
                className={getClassNamesFor('price')}
              >
                Price
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('avg_rating')}
                className={getClassNamesFor('avg_rating')}
              >
                Rating
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('year')}
                className={getClassNamesFor('year')}
              >
                Published Year
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('page_count')}
                className={getClassNamesFor('page_count')}
              >
                Pages
              </button>
            </th>
          </tr>
        </thead>
       
        {items.map((book) => (
          <BookItem item={book} searchedTerm = {SearchTerms}/>
        ))}
        


        {/* {currentBooks.map((book) => (
          <BookItem item={book} />
        ))} */}

        
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
