import React from "react";
import "./../styles/searchbar.css"

function Searchbar() {
  return (
    <div className="search-outer">
      <nav className="navbar searchbar">
        <div className="container-fluid">
          <form className="d-flex" role="search">
            <input
              className="form-control search-text-input"
              type="search"
              placeholder="Enter a city"
              aria-label="Search"
            />
            <button className="btn btn-primary btn-search" type="submit">
              Add city
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Searchbar;
