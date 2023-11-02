import React from "react";
import cities from "./../cities.json";
import Card from "./Card";

function Cards() {
  return (
    <div className="container">
      <div className="city-list">
        <div className="row">
          {cities.List.map((city) => (
            <div key={city.CityCode} className="col-lg-6 col-sm-12 col-md-12">
              {" "}
              <Card key={city.CityCode} city={city} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
