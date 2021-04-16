import React from "react";
import "./Quotes.css";
import MUIDataTable from "mui-datatables";
import Loading from "../../features/Loading";
import useAxios from "axios-hooks";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Quotes() {
  const [search_text, setSearchText] = useState<string>("");
  const searchText: any = React.useRef();

  const options = {
    print: false,
    download: false,
    selectableRowsHideCheckboxes: true,
    jumpToPage: true,
    searchText: search_text,
    search: false,
    filterType: "checkbox" as any,
    setRowProps: (row: any, dataIndex: any, rowIndex: any) => {
      return {
        style: {cursor : "pointer"},
      };
    },
    onRowClick: (authorData: any) =>
      window.location.assign("/quote/" + authorData[0]),
  };

  const columns = [
    {
      name: "quote_id",
      label: "Quote ID",
      options: {
        filter: false,
        display: false,
      },
    },
    {
      name: "quote",
      label: "Quote",
      options: {
        filter: false,
        customBodyRender: (val: any, tableMeta: any, updateVal: any) =>
          quoteCustomBodyRender(val, tableMeta, updateVal),
      },
    },
    {
      name: "author_name",
      label: "Author",
      options: {
        filter: false,
        customBodyRender: (val: any, tableMeta: any, updateVal: any) =>
          quoteCustomBodyRender(val, tableMeta, updateVal),
      },
    },
    {
      name: "length",
      label: "Length",
      options: {
        filter: false,
        customBodyRender: (val: any, tableMeta: any, updateVal: any) =>
          quoteCustomBodyRender(val, tableMeta, updateVal),
      },
    },
    {
      name: "num_unique_words",
      label: "No. of Unique Words",
      options: {
        filter: true,
        setCellHeaderProps: (val: any) => ({ style: { fontWeight: "bold" } }),
        display: true,
        filterOptions: {
          names: ["1 - 40", "41 - 80", "81 - 120", "121 - 200", "201+"],
          logic(unique: any, filterVal: any) {
            const show =
              (filterVal.indexOf("1 - 40") >= 0 &&
                unique >= 1 &&
                unique <= 40) ||
              (filterVal.indexOf("41 - 80") >= 0 &&
                unique >= 41 &&
                unique <= 80) ||
              (filterVal.indexOf("81 - 120") >= 0 &&
                unique >= 81 &&
                unique <= 120) ||
              (filterVal.indexOf("121 - 200") >= 0 &&
                unique >= 121 &&
                unique <= 200) ||
              (filterVal.indexOf("201+") >= 0 && unique >= 201);
            return !show;
          },
          customBodyRender: (val: any, tableMeta: any, updateVal: any) =>
            quoteCustomBodyRender(val, tableMeta, updateVal),
        },
      },
    },
    {
      name: "score",
      label: "Score",
      options: {
        hint: "A quote's score indicates the quote's NLP score, or the level of sentiment/emotional tone behind the words.",
        filter: false,
        customBodyRender: (val: any, tableMeta: any, updateVal: any) =>
          quoteCustomBodyRender(val, tableMeta, updateVal),
      },
    },
    {
      name: "language",
      label: "Language",
      options: {
        filter: true,
        setCellHeaderProps: (val: any) => ({ style: { fontWeight: "bold" } }),
        display: false,
        filterOptions: {
          names: [
            "Bosnian",
            "German",
            "English",
            "Spanish",
            "Polish",
            "Portuguese",
          ],
          logic(language: any, filterVal: any) {
            const show =
              (filterVal.indexOf("Bosnian") >= 0 && language === "bs") ||
              (filterVal.indexOf("German") >= 0 && language === "de") ||
              (filterVal.indexOf("English") >= 0 && language === "en") ||
              (filterVal.indexOf("Spanish") >= 0 && language === "es") ||
              (filterVal.indexOf("Polish") >= 0 && language === "pl") ||
              (filterVal.indexOf("Portuguese") >= 0 && language === "pt");
            return !show;
          },
          customBodyRender: (val: any, tableMeta: any, updateVal: any) =>
            quoteCustomBodyRender(val, tableMeta, updateVal),
        },
      },
    },
    {
      name: "num_syllables",
      label: "Number Syllables",
      options: {
        filter: true,
        setCellHeaderProps: (val: any) => ({ style: { fontWeight: "bold" } }),
        display: false,
        filterOptions: {
          names: ["1 - 40", "41 - 80", "81 - 120", "121 - 200", "201+"],
          logic(syllables: any, filterVal: any) {
            const show =
              (filterVal.indexOf("1 - 40") >= 0 &&
                syllables >= 1 &&
                syllables <= 40) ||
              (filterVal.indexOf("41 - 80") >= 0 &&
                syllables >= 41 &&
                syllables <= 80) ||
              (filterVal.indexOf("81 - 120") >= 0 &&
                syllables >= 81 &&
                syllables <= 120) ||
              (filterVal.indexOf("121 - 200") >= 0 &&
                syllables >= 121 &&
                syllables <= 200) ||
              (filterVal.indexOf("201+") >= 0 && syllables >= 201);
            return !show;
          },
          customBodyRender: (val: any, tableMeta: any, updateVal: any) =>
            quoteCustomBodyRender(val, tableMeta, updateVal),
        },
      },
    },
    {
      name: "length",
      label: "Length",
      options: {
        filter: true,
        setCellHeaderProps: (val: any) => ({ style: { fontWeight: "bold" } }),
        display: false,
        filterOptions: {
          names: ["1 - 100", "101 - 200", "201 - 400", "401 - 800", "801+"],
          logic(length: any, filterVal: any) {
            const show =
              (filterVal.indexOf("1 - 100") >= 0 &&
                length >= 1 &&
                length <= 100) ||
              (filterVal.indexOf("101 - 200") >= 0 &&
                length >= 101 &&
                length <= 200) ||
              (filterVal.indexOf("201 - 400") >= 0 &&
                length >= 201 &&
                length <= 400) ||
              (filterVal.indexOf("401 - 800") >= 0 &&
                length >= 401 &&
                length <= 800) ||
              (filterVal.indexOf("801+") >= 0 && length >= 801);
            return !show;
          },
          customBodyRender: (val: any, tableMeta: any, updateVal: any) =>
            quoteCustomBodyRender(val, tableMeta, updateVal),
        },
      },
    },
    {
      name: "author_name",
      label: "Author First Initial",
      options: {
        filter: true,
        setCellHeaderProps: (val: any) => ({ style: { fontWeight: "bold" } }),
        display: false,
        filterOptions: {
          names: ["A - E", "F - J", "K - O", "P - T", "U - Z"],
          logic(name: any, filterVal: any) {
            const show =
              (filterVal.indexOf("A - E") >= 0 &&
                name.charCodeAt(0) >= "A".charCodeAt(0) &&
                name.charCodeAt(0) <= "E".charCodeAt(0)) ||
              (filterVal.indexOf("F - J") >= 0 &&
                name.charCodeAt(0) >= "F".charCodeAt(0) &&
                name.charCodeAt(0) <= "J".charCodeAt(0)) ||
              (filterVal.indexOf("K - O") >= 0 &&
                name.charCodeAt(0) >= "K".charCodeAt(0) &&
                name.charCodeAt(0) <= "O".charCodeAt(0)) ||
              (filterVal.indexOf("P - T") >= 0 &&
                name.charCodeAt(0) >= "P".charCodeAt(0) &&
                name.charCodeAt(0) <= "T".charCodeAt(0)) ||
              (filterVal.indexOf("U - Z") >= 0 &&
                name.charCodeAt(0) >= "U".charCodeAt(0) &&
                name.charCodeAt(0) <= "Z".charCodeAt(0));
            return !show;
          },
          customBodyRender: (val: any, tableMeta: any, updateVal: any) =>
            quoteCustomBodyRender(val, tableMeta, updateVal),
        },
      },
    },
  ];

  function searchOnClick() {
    window.location.assign("/search/q=" + searchText.current.value + "/model=quote");
  }

  const [{ data, loading }] = useAxios("/api/quotes");

  const quoteCustomBodyRender = (val: any, tableMeta: any, updateVal: any) => (
    <div className = "row-class" style = {{"fontSize" : "16px"}}>
      <Highlighter
        highlightClassName="highlight-class"
        searchWords={[search_text]}
        textToHighlight={val + ""}
      ></Highlighter>
    </div>
  );

  return (
    <div className="align-items-center" style={{ textAlign: "center" }}>
      <div className="container mb-5 mt-5 d-flex flex-row flex-wrap justify-content-between">
        <h2>Discover Quotes</h2>
        <div className="input-group">
          <div className="form-outline" id="authors-search">
            <input
              type="search"
              ref={searchText}
              className="form-control"
              placeholder="Search quotes..."
              onKeyPress={(event: any) => {
                if (event.key === "Enter") {
                  setSearchText(searchText.current.value);
                }
              }}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setSearchText(searchText.current.value)}
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
          data={data.quotes}
          columns={columns}
          options={options}
        />
      )}
    </div>
  );
}

export default Quotes;
