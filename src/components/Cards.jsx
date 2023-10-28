
import React from "react";
import cities from "./../cities.json";
import CityWeather from "./CityWeather";
import Card from "./Card";
import "./../styles/cards.css"

function Cards() {
  return (
    <div className="container">
      <div className="city-list">
        <div className="row">
        {cities.List.map((city) => (
            <div className="col-lg-6 col-sm-12"> <Card key={city.CityCode} city={city} /></div>
        ))}
        </div>
        
      </div>
    </div>
  );
}

export default Cards;