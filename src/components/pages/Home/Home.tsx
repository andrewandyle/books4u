import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
  <div style ={{height: "100%"}}>
    <div className = "text-center">
      <h1>Welcome to Books4U</h1>
      <h3>We're here to help you to find the books</h3>
    </div>
    
    <div className = "container flex justify-content-center" style = {{height :600}}>
        <div className = "row">
          <div className = "column ml- mt-5 mb-5" style = {{width:"33%"}}>
            <div className="card text-center">
              <div className = "overflow">
                <img src = "jsx-a11y/alt-text">
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
                <img src = "jsx-a11y/alt-text">

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
                <img src = "jsx-a11y/alt-text">

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
