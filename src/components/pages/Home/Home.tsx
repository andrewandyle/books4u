import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
  <div style ={{height: "100%"}}>
    <div className = "text-center">
      <h1>Welcome to Books4U</h1>
      <h3>We're here to help you to find the books</h3>
    </div>
    
    <div className = "container flex justify-content-center" style = {{height :"600"}}>
        <div className = "row">
          <div className = "column ml- mt-5 mb-5" style = {{width:"33%"}}>
            <div className="card text-center">
              <div className = "overflow">
                <img src = "https://media.wired.com/photos/5be4cd03db23f3775e466767/master/w_2560%2Cc_limit/books-521812297.jpg" alt = "bookImage" style={{height:310, width:"100%"}}>
                </img>
              </div>
              <div className = "card-body text-dark">
                <button type="button" className="btn btn-outline-success">
                  <Link to="/books" className="nav-link">
                    Books
                  </Link>
                </button>
              </div>
            </div>
          </div>

          <div className = "column ml-5 mt-5 mb-5" style = {{width:"33%"}}>
            <div className="card text-center">
              <div className = "overflow">
                <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Shakespeare_Droeshout_1623.jpg/900px-Shakespeare_Droeshout_1623.jpg" alt = "AuthorImage" style={{height:310, width:"100%"}}>

                </img>
              </div>
              <div className = "card-body text-dark">
                <button type="button" className="btn btn-outline-success">
                  <Link to="/authors" className="nav-link">
                    Authors
                  </Link>
                </button>
              </div>
            </div>
          </div>

          <div className = "column ml-5 mt-5 mb-5" style = {{width:"33%"}}>
            <div className="card text-center">
              <div className = "overflow">
                <img src = "https://libreshot.com/wp-content/uploads/2017/04/close-up-inside-of-a-book-973x691.jpg" alt = "QuotesImage" style={{height:310, width:"100%"}}>

                </img>
              </div>
              <div className = "card-body text-dark">
                <button type="button" className="btn btn-outline-success">
                  <Link to="/quotes" className="nav-link">
                    Quotes
                  </Link>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      
  </div>
  
  )
}

export default Home;
