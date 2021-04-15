import algoliasearch from 'algoliasearch';
import { InstantSearch, Index, SearchBox, Hits, Highlight, Configure, Pagination, ClearRefinements, RefinementList, connectHits, connectStateResults} from 'react-instantsearch-dom';
import 'instantsearch.css/themes/satellite.css';
import BookCard from "./BookCard";
// My Algolia Account:
const mySearch = algoliasearch("0R6QT9BHIM", "a6a3ab0dbac35b08cc1287f38c395079");

const BookHits = ({ hits }:any) => (
    <div className="row">
        {hits.map((hit:any) =>(
            <div className="search-columns" key={hit.book_id}>
                <BookCard hit={hit}/>
            </div>
        ))}
    </div>
);

const SearchBookHits=connectHits(BookHits);

const BookContent = connectStateResults(({searchState}) =>
searchState && searchState.query ? (
    <div className="content">
        <SearchBookHits/>
    </div>
) : null 
);

function Search(q:any){
    return(
        <div>
            <h1>Search Results: {q.q}</h1> 

            <InstantSearch indexName="books_search" searchClient={mySearch} searchState={{query: q.q,}}>
            <div style={{ display: "none" }}><SearchBox /></div>

            <Index indexName="books_search">
                <div>
                    <h1>Books Results</h1>
                    <main><BookContent/></main>
                </div>
            </Index>
            </InstantSearch>
        </div>
    )
}

export default Search;