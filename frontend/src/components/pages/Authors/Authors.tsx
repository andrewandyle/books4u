// @ts-nocheck
import React, { useRef } from "react";
import MUIDataTable from "mui-datatables";
import Loading from "../../features/Loading";
import useAxios from "axios-hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

function Authors(props: any) {
  const searchText: any = useRef();
  const options = {
    print: false,
    download: false,
    viewColumns: false,
    selectableRowsHideCheckboxes: true,
    jumpToPage: true,
    search: false,
    filterType: "checkbox" as any,
    onRowClick: (authorData: any) =>
      window.location.assign("/author/" + authorData[0]),
  };

  const [{ data, loading }] = useAxios("/api/authors");

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
      },
    },
    {
      name: "last_name",
      label: "Last Name",
      options: {
        filter: false,
      },
    },
    {
      name: "num_published_books",
      label: "No. of Published Books",
      options: {
        filter: false,
      },
    },
    {
      name: "occupation",
      label: "Occupation",
      options: {
        filter: true,
        filterType: "dropdown" as any,
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
        customBodyRender: (val: any) => {
          return val ? val.toFixed(2) : "N/A";
        },
      },
    },
  ];

  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        // For the top row with the filter button
        MuiToolbar: {
          root: {
            backgroundColor: "#dfd4c8",
          },
        },
        // For the row with the column headers
        MUIDataTableHeadCell: {
          root: {
            backgroundColor: "#dfd4c8 !important",
          },
        },
        // For every row in the table
        MUIDataTableBodyCell: {
          root: {
            fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif`,
            fontSize: 16,
            cursor: "pointer",
            backgroundColor: "#faebd7",
          },
        },
        // For the footer with pagination
        MuiTableCell: {
          footer: {
            backgroundColor: "#dfd4c8",
          },
        },
      },
    });

  const searchAuthors = () => {
    window.location.assign(
      `/search/q=${searchText.current.value}/model=author`
    );
  };

  return (
    <div
      className="container align-items-center"
      style={{ textAlign: "center" }}
    >
      <div className="mb-5 mt-5 d-flex flex-row flex-wrap justify-content-between">
        <h2>Discover Authors</h2>
        <div className="input-group">
          <div className="form-outline" id="authors-search">
            <input
              type="search"
              ref={searchText}
              className="form-control"
              placeholder="Search authors..."
              onKeyPress={(event: any) => {
                if (event.key === "Enter") {
                  searchAuthors();
                }
              }}
            />
          </div>
          <button className="btn btn-primary" onClick={() => searchAuthors()}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <MuiThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title=""
            data={data.authors}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
      )}
    </div>
  );
}

export default Authors;
