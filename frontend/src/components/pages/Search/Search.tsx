import algoliasearch from 'algoliasearch';
import { InstantSearch, Index, SearchBox, Hits, Highlight, Configure, Pagination, ClearRefinements, RefinementList, connectHits, connectStateResults} from 'react-instantsearch-dom';
import 'instantsearch.css/themes/satellite.css';
import BookCard from "./BookCard";
// My Algolia Account:
const mySearch = algoliasearch("0R6QT9BHIM", "a6a3ab0dbac35b08cc1287f38c395079");

// const BookHit = ({hits} : any) => (
//     <Highlight attribute="author_names" hit={hits} tagName="mark"/> 
// )

//const CustomBookHits = connectHits(BookHit);

const myHits = ({ hits } : any) => (
  <ol>
    {hits.map((hit:any) => (
      <li key={hit.objectID}>{hit.name}</li>
    ))}
  </ol>
);

const CustomHits = connectHits(myHits);
  
// const BookContent = connectStateResults(({ searchState }) =>
//   searchState && searchState.query ? (
//     <BookHit/>
//   ) : null
// );

function Search(q:any){
    return(
        <div>
            <h1>Search Results: {q.q}</h1> 

            <InstantSearch indexName="books_search" searchClient={mySearch} searchState={{query: q.q,}}>
            {/*Hide searchbox on landing page */}
            <div style={{ display: "none" }}><SearchBox /></div>
            {/*Books Results*/}
            <Index indexName="books_search">
                <div>
                    <h1>Books Results</h1>
                    <CustomHits/>
                </div>
            </Index>
            </InstantSearch>
        </div>
    )
}

export default Search;