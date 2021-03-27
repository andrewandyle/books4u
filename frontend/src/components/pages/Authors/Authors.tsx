import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";

const columns = ['Name', 'On Tour', 'Gender', 'Genres']

class Authors extends Component {
  state = {
    allAuthors: [],
  };

  componentDidMount() {
    axios.get("/api/authors").then((res: { data: any }) => {
      let allAuthors = res.data.authors;
      allAuthors = allAuthors.map((author: any) => {
        const { first_name, last_name, on_tour, gender, genres } = author
        return [`${first_name} ${last_name}`, on_tour, gender, genres ? genres.map((genre: any) => genre.replace(/^'|'$/g, '')).join(', ') : '']
      })
      this.setState({ allAuthors });
    });
  }

  render() {
    return (
      <MUIDataTable
        title="Authors"
        data={this.state.allAuthors}
        columns={columns}
      />
    );
  }
}

export default Authors;
