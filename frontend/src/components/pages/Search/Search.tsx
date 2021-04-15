import algoliasearch from 'algoliasearch';
import { InstantSearch, Index, SearchBox, Hits, Highlight, Configure, Pagination, ClearRefinements, RefinementList, connectHits, connectStateResults} from 'react-instantsearch-dom';
import 'instantsearch.css/themes/satellite.css';
import BookCard from "./BookCard";
// My Algolia Account:
const mySearch = algoliasearch("0R6QT9BHIM", "a6a3ab0dbac35b08cc1287f38c395079");

const BookHits = ({ hit }:any) => (
    <div >
        <Highlight attribute={"name"} tagName="mark" hit={hit}/>
    </div>
);

const SearchBookHits=connectHits(BookHits);

const BookContent = connectStateResults(({searchState}) =>
searchState && searchState.query ? (
        <SearchBookHits/>
) : null 
);

function Search(q:any){
    return(
        <div>
            <h1>Search Results: {q.query}</h1> 

            <InstantSearch indexName="books_search" searchClient={mySearch} searchState={{query: q.query}}>
            
            <div style={{ display: "none" }}><SearchBox /></div>

            <Index indexName="books_search">
                <div>
                    <h1>Books Results</h1>
                    <BookContent/>
                </div>
            </Index>
            </InstantSearch>
        </div>
    )
}

export default Search;