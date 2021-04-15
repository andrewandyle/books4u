import React from "react";
import { useState } from "react";
import MUIDataTable from "mui-datatables";
import Loading from "../../features/Loading";
import useAxios from "axios-hooks";
import Highlighter from "react-highlight-words";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Authors(props: any) {
  const [search_text, setSearchText] = useState<string>("");
  const text_in: any = React.useRef();

  const options = {
    print: false,
    download: false,
    selectableRowsHideCheckboxes: true,
    jumpToPage: true,
    searchText: search_text,
    search: false,
    filterType: "checkbox" as any,
    onRowClick: (authorData: any) =>
      window.location.assign("/author/" + authorData[0]),
  };

  const [{ data, loading }] = useAxios("/api/authors");
  const authorCustomBodyRender = (val: any, tableMeta: any, updateVal: any) => (
    <div>
      <Highlighter
        highlightClassName="highlight-class"
        searchWords={[search_text]}
        textToHighlight={val + ""}
      ></Highlighter>
    </div>
  );
  const columns = [
    {
      name: "author_id",
      label: "Author ID",
      options: {
        filter: false,
        display: false,
      },
    },
    {
      name: "on_tour",
      label: "On Tour",
      filter: true,
      options: {
        setCellHeaderProps: (val: any) => ({ style: { fontWeight: "bold" } }),
        display: false,
        filterOptions: {
          names: ["On Tour", "Not On Tour"],
          logic(onTour: any, filterVal: any) {
            const show =
              (filterVal.indexOf("On Tour") >= 0 && onTour === true) ||
              (filterVal.indexOf("Not On Tour") >= 0 && onTour === false);
            return !show;
          },
        },
      },
    },
    {
      name: "bestsellers",
      label: "Bestsellers",
      filter: true,
      options: {
        setCellHeaderProps: (val: any) => ({ style: { fontWeight: "bold" } }),
        display: false,
        filterOptions: {
          names: ["Bestseller", "Not Besteller"],
          logic(bestSeller: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Bestseller") >= 0 && bestSeller === true) ||
              (filterVal.indexOf("Not Besteller") >= 0 && bestSeller === false);
            return !show;
          },
        },
      },
    },
    {
      name: "gender",
      label: "Gender",
      filter: true,
      options: {
        setCellHeaderProps: (val: any) => ({ style: { fontWeight: "bold" } }),
        display: false,
        filterOptions: {
          names: ["Male", "Female"],
          logic(gender: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Male") >= 0 && gender === "M") ||
              (filterVal.indexOf("Female") >= 0 && gender === "F");
            return !show;
          },
        },
      },
    },

    {
      name: "first_name",
      label: "First Name",
      options: {
        filter: false,
        customBodyRender: (val: any, tableMeta: any, updateVal: any) =>
          authorCustomBodyRender(val, tableMeta, updateVal),
      },
    },
    {
      name: "last_name",
      label: "Last Name",
      options: {
        filter: false,
        customBodyRender: (val: any, tableMeta: any, updateVal: any) =>
          authorCustomBodyRender(val, tableMeta, updateVal),
      },
    },
    {
      name: "num_published_books",
      label: "No. of Published Books",
      options: {
        filter: false,
        customBodyRender: (val: any, tableMeta: any, updateVal: any) =>
          authorCustomBodyRender(val, tableMeta, updateVal),
      },
    },
    {
      name: "occupation",
      label: "Occupation",
      options: {
        filter: true,
        filterType: "dropdown" as any,
        customBodyRender: (val: any, tableMeta: any, updateVal: any) =>
          authorCustomBodyRender(val, tableMeta, updateVal),
      },
    },
    {
      name: "avg_rating",
      label: "Average Rating",
      options: {
        filter: true,
        filterOptions: {
          names: ["1-3", "3-4", "4-5"],
          logic(avg_rating: any, filterVal: any) {
            const show =
              (filterVal.indexOf("1-3") >= 0 &&
                avg_rating >= 1 &&
                avg_rating <= 3) ||
              (filterVal.indexOf("3-4") >= 0 &&
                avg_rating >= 3 &&
                avg_rating <= 4) ||
              (filterVal.indexOf("4-5") >= 0 &&
                avg_rating >= 4 &&
                avg_rating <= 5);
            return !show;
          },
        },
        customBodyRender: (val: any, tableMeta: any, updateVal: any) =>
          authorCustomBodyRender(
            Math.round(val * 100) / 100,
            tableMeta,
            updateVal
          ),
      },
    },
  ];

  return (
    <div className="align-items-center" style={{ textAlign: "center" }}>
      <div className="container mb-5 mt-5 d-flex flex-row flex-wrap justify-content-between">
        <h2>Discover Authors</h2>
        <div className="input-group">
          <div className="form-outline" id="authors-search">
            <input
              type="search"
              ref={text_in}
              className="form-control"
              placeholder="Search authors..."
              onKeyPress={(event: any) => {
                if (event.key === "Enter") {
                  setSearchText(text_in.current.value);
                }
              }}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setSearchText(text_in.current.value)}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <MUIDataTable
          title=""
          data={data.authors}
          columns={columns}
          options={options}
        />
      )}
    </div>
  );
}

export default Authors;
