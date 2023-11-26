import React from "react";
import cities from "./../cities.json";
import Card from "./Card";
import "./../styles/card.css";

function Cards() {
  return (
      <div className="city-list">
        <div className="row detail_row">
          {cities.List.map((city) => (
            <div key={city.CityCode} className="card-alignment col-lg-6 col-sm-12 col-md-12">
              <Card city={city} />
            </div>
          ))}
        </div>
      </div>
  );
}

export default Cards;
