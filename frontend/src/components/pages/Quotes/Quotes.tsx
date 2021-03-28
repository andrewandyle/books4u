import React from "react";
import MUIDataTable from "mui-datatables";
import Loading from "../../features/Loading";
import useAxios from "axios-hooks";

const columns = [
  {
    name: "id",
    label: "Quote ID",
    options: {
      filter: false,
      display: false,
    },
  },
  { name: "quote", label: "Quote" },
  { name: "author", label: "Author" },
  { name: "length", label: "Length" },
  { name: "num_unique_words", label: "No. of Unique Words" },
  { name: "score", label: "Score" },
];

const options = {
  print: false,
  download: false,
  selectableRowsHideCheckboxes: true,
  jumpToPage: true,
  onRowClick: (quoteData: any) =>
    window.location.assign("/quote/" + quoteData[0]),
};

function Quotes() {
  const [{ data, loading }] = useAxios("/api/quotes");

  return loading ? (
    <Loading />
  ) : (
    <MUIDataTable
      title="Discover Quotes"
      data={data.quotes}
      columns={columns}
      options={options}
    />
  );
}

export default Quotes;
