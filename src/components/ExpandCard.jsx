import React from "react";
import backgroundImg from "./../images/Rectangle.png";
import navigationImg from "./../images/navigation.png";
import backArrow from "./../images/arrow.png";
import "./../styles/expandCard.css";
import cloud from "./../images/cloud.png";
import { useSearchParams } from "react-router-dom";

function ExpandCard() {

  const [searchParams, setSearchParam] = useSearchParams()

  return (
    <div className="card-outer">
      <div className="card card-inner col-lg-8">
        <div className="card-header">
          <button type="button" className="btn-backward">
            <img src={backArrow} />
            {/* <i class="bi bi-arrow-left"></i> */}
          </button>

          <div class="row">
            <div class="col-md-6 offset-lg-3">
              <h2 className="card-text-city">{searchParams.get('cityName')}, Lk</h2>
              <h1 className="card-text-timeDate">9:19am, Feb 8</h1>
            </div>
          </div>

          <div class="row justify-content-center detailrow offset-md-2">
            <div class="col-3">
              <img src={cloud} />
              {/* <i class="bi bi-cloud"></i> */}
              <p className="card-text-skyType">Few Clouds</p>
            </div>
            <div class="col-1 top-vl"></div>
            <div class="col-3">
              <p className="card-text-temp">27° c</p>
              <p className="card-text-minTemp">Temp min: 25°c</p>
              <p className="card-text-maxTemp">Temp max: 27°c</p>
            </div>
          </div>
        </div>

        <div className="card-lower">
          <div className="row below-detail-row col-md-3 offset-md-1">
            <div className="col-md-4">
              <div className="card card-segment">
                <div className="card-body">
                  <p className="card-text-pressure">Pressure: <span className="input-details">1018hPa</span></p>
                  <p className="card-text-humidity">Humidity: <span className="input-details">78%</span></p>
                  <p className="card-text-visibility">Visibility: <span className="input-details">8.0km</span></p>
                </div>
              </div>
            </div>
            <div class="col-md-1 bottom-vl"></div>
            <div className="col-md-3 border-left border-right">
              <div className="card card-segment">
                <div className="card-body">
                  <div className="card-text-imgNavigation offset-md-5">
                    <img src={navigationImg} />
                  </div>
                  <p className="card-text-wind">4.0m/s 120 Degree</p>
                </div>
              </div>
            </div>
            <div class="col-md-1 bottom-vl"></div>
            <div className="col-md-3">
              <div className="card card-segment sunrise-detail-col">
                <div className="card-body">
                  <p className="card-text-sunrise">Sunrise: <span className="input-details">07:00am</span></p>
                  <p className="card-text-sunset">Sunset: <span className="input-details">07:00pm</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpandCard;
