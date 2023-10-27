import React from "react";
import "./../styles/searchbar.css"

function Searchbar() {
  return (
    <div className="search-outer">
      <nav class="navbar searchbar">
        <div class="container-fluid">
          <form class="d-flex" role="search">
            <input
              class="form-control search-text-input"
              type="search"
              placeholder="Enter a city"
              aria-label="Search"
            />
            <button class="btn btn-primary btn-search" type="submit">
              Add city
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Searchbar;
