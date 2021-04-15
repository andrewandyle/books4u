import React from "react";
import { Link } from "react-router-dom";

// Icons
import Logo from "../../media/logo.png";
import User from "../../media/user.png";
import Book from "../../media/book.png";
import Author from "../../media/author.png";
import Quote from "../../media/quote.png";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { AiOutlineSearch } from "react-icons/ai";

function Navbar() {

  const textInput: any = React.useRef();
  
  function searchOnClick() {
    window.location.assign("/search/q=" + textInput.current.value);
  }

  const styles = {
    searchButton: {
      backgroundColor: "antiquewhite",
      borderColor: "white",
      color: "black",
      fontSize: "1.1vw",
    } as React.CSSProperties,
  };

  return (
    <nav
      className="navbar navbar-dark navbar-expand-lg"
      style={{ backgroundColor: "#654321" }}
    >
      <Link to="/" className="navbar-brand">
        <img
          src={Logo}
          width={30}
          alt="Books4U"
          style={{ marginLeft: 7, marginRight: 10 }}
        />
        Books4U
      </Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/about" className="nav-link">
              <img className="nav-icon" src={User} alt="About" />
              About
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/books" className="nav-link">
              <img className="nav-icon" src={Book} alt="Books" />
              Books
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/authors" className="nav-link">
              <img className="nav-icon" src={Author} alt="Authors" />
              Authors
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/quotes" className="nav-link">
              <img className="nav-icon" src={Quote} alt="Quotes" />
              Quotes
            </Link>
          </li>
          
          
          <Form inline onSubmit={(e) => {
            e.preventDefault();
          }}>
          <InputGroup>
            {/* <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
              <Button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</Button>
            </form> */}
            <FormControl
              className="form-inline my-2 my-lg-0 mr-sm-0 my-sm-0"
              type="text"
              placeholder="Search"
              ref={textInput}
              style={{fontSize: "1.1vw"}}
              onKeyPress={(event: any) => {
                if (event.key === "Enter") {
                  searchOnClick();
                }
              }}
            />



            {/* <div className="divider"/> */}
            <InputGroup.Append style={{fontSize: "1.1vw"}}>
              <Button
                style={styles.searchButton}
                variant="info"
                onClick={() => searchOnClick()}
              >
                <AiOutlineSearch/>
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
