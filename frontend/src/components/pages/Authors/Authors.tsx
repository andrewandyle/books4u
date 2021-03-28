import React from "react";
import MUIDataTable from "mui-datatables";
import Loading from "../../Loading";
import useAxios from "axios-hooks";

const columns = [
  {
    name: "id",
    label: "Author ID",
    options: {
      filter: false,
      display: false,
    },
  },
  { name: "first_name", label: "First Name" },
  { name: "last_name", label: "Last Name" },
  { name: "num_published_books", label: "No. of Published Books" },
  { name: "occupation", label: "Occupation" },
  { name: "avg_rating", label: "Average Rating" },
];

const options = {
  print: false,
  download: false,
  selectableRowsHideCheckboxes: true,
  onRowClick: (authorData: any) =>
    window.location.assign("/author/" + authorData[0]),
};

function Authors() {
  const [{ data, loading }] = useAxios("/api/authors");

  return loading ? (
    <Loading />
  ) : (
    <MUIDataTable
      title="Discover Authors"
      data={data.authors}
      columns={columns}
      options={options}
    />
  );
}

export default Authors;
