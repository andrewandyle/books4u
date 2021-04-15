import algoliasearch from 'algoliasearch';
import { InstantSearch, Index, SearchBox, Hits, Highlight, Configure, Pagination, ClearRefinements, RefinementList, connectHits, connectStateResults} from 'react-instantsearch-dom';
import 'instantsearch.css/themes/satellite.css';
// My Algolia Account:
const mySearch = algoliasearch("0R6QT9BHIM", "a6a3ab0dbac35b08cc1287f38c395079");


const bookHits = ({ hits } : any) => (
  <ol>
    {hits.map((hit:any) => (
        <div>
            {hit.name}
            {hit.author_names}
            {hit.genres}
        </div>
    ))}
  </ol>
);

const CustomBookHits = connectHits(bookHits);
  
const authorHits = ({ hits } : any) => (
    <ol>
      {hits.map((hit:any) => (
          <div>
              {hit.first_name}
              {hit.last_name}
              {hit.genres}
          </div>
      ))}
    </ol>
  );

  const CustomAuthorHits = connectHits(authorHits);

  const quoteHits = ({ hits } : any) => (
    <ol>
      {hits.map((hit:any) => (
          <div>
              {hit.author_name}
              {hit.language}
              {hit.tags}
          </div>
      ))}
    </ol>
  );

  const CustomQuoteHits = connectHits(quoteHits);

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
                    <CustomBookHits/>
                </div>
            </Index>

            <Index indexName="author_search">
                <div>
                    <h1>Author Results</h1>
                    <CustomAuthorHits/>
                </div>
            </Index>

            <Index indexName="quote_search">
                <div>
                    <h1>Quote Results</h1>
                    <CustomQuoteHits/>
                </div>
            </Index>
            </InstantSearch>
        </div>
    )
}

export default Search;