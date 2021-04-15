import algoliasearch from 'algoliasearch';
import { InstantSearch, Index, SearchBox, Hits, Highlight, Configure, Pagination, ClearRefinements, RefinementList} from 'react-instantsearch-dom';
import 'instantsearch.css/themes/satellite.css';
// My Algolia Account:
const mySearch = algoliasearch("0R6QT9BHIM", "a6a3ab0dbac35b08cc1287f38c395079");

const myHits = ({ hit }) => (
    //<img src={hit.image} alt={hit.name} className="image"/>
        <div className="ais-Hits-item">
        <div className="mycard">
            <a href={"/book/" + hit.book_id}>
                <Highlight attribute="author_names" hit={hit} tagName="mark"/> 
            </a>
            <a href={"/author/" + hit.author_id}>
                <Highlight attribute="first_name" hit={hit} tagName="mark"/>
                <Highlight attribute="last_name" hit={hit} tagName="mark"/>
            </a>

            <a href={"/quote/" + hit.quote_id}>
                <Highlight attribute="author_name" hit={hit} tagName="mark" classname="card-title"/> 
            </a>           
                <div className="card-rating">Rating: {hit.avg_rating}</div>
                <div className="card-genre"> {hit.genre} </div>
        </div>
    </div>
    );


function Search(){
    return(
    <div> 
        <h1> Multiple Index Search </h1>
       <InstantSearch indexName="books_search" searchClient={mySearch}>
          
           <SearchBox/>
            <Index indexName="books_search">
                <h2> Books Results </h2>
                <Configure hitsPerPage={10} />
                < Hits hitComponent={myHits}/>
            </Index>

            <Index indexName="author_search">
                <h2> Author Results </h2>
                <Configure hitsPerPage={10} />
                <Hits hitComponent={myHits}/>
            </Index>
            
            <Index indexName="quote_search">
                <h2> Quotes Results</h2>
                <Configure hitsPerPage={10} />
                <Hits hitComponent={myHits}/>
            </Index>
            
       </InstantSearch>
    </div>
    
    )
}

export default Search;