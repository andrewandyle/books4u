import React from "react";
import Table from "../../templates/Table"

function Books() {
    const books = [{id:'1', title:'title1', author:'author1'}, {id:'2', title:'title2', author:'author2'}, {id:'3',title:'title3', author:'author3'}]
    return (
        <div>
            This is the books page.
            <Table data={books}></Table>
        </div>
        
    );
}

export default Books;
