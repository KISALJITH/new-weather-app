import React from "react";
import "./../styles/card.css";
import backgroundImg from "./../images/Rectangle.png";
import navigationImg from "./../images/navigation.png"

function Card() {
  return (
    <div className="card-outer">

    <div className="card card-inner">
      <div className="card-header">
      <button type="button" className="btn-close right-align" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>

    <div class="card text-bg-dark card-upper">
        <img src={backgroundImg} class="card-img" alt="..." />
        <div class="card-img-overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="card card-segment">
                  <div className="card-body">
                    <p className="card-text-city">Colombo, Lk</p>
                    <p className="card-text-timeDate">9:19am, Feb 8</p>
                    <p className="card-text-skyType">Cloudy</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card card-segment">
                  <div className="card-body">
                    <p className="card-text-temp">27° c</p>
                    <p className="card-text-minTemp">Temp min: 25°c</p>
                    <p className="card-text-maxTemp">Temp max: 27°c</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-lower">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card card-segment">
                <div className="card-body">
                  <p className="card-text-pressure">Pressure: 1018hPa</p>
                  <p className="card-text-humidity">Humidity: 78%</p>
                  <p className="card-text-visibility">Visibility: 8.0km</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 border-left border-right">
              <div className="card card-segment">
                <div className="card-body">
                  <img className="card-text-imgNavigation" src={navigationImg} />
                  <p className="card-text-wind">4.0m/s 120 Degree</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card card-segment">
                <div className="card-body">
                  <p className="card-text-sunrise">Sunrise: 07:00am</p>
                  <p className="card-text-sunset">Sunset: 07:00pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </div>
  );
}

export default Card;
