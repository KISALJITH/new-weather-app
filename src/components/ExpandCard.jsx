import React from "react";
import navigationImg from "./../images/navigation.png";
import backArrow from "./../images/back.png";
import "./../styles/expandCard.css";
import cloud from "./../images/cloud.png";
import { useSearchParams, useNavigate } from "react-router-dom";

function ExpandCard() {

  const [searchParams, setSearchParam] = useSearchParams()

  const navigate = useNavigate();
  const backToHome= ()=>{
    navigate({pathname:"/"})
  }

  return (
    <div className="card-outer">
      <div className="container card card-inner col-lg-8">
        <div className="card-header">
          <button type="button" className="btn-backward" onClick={backToHome}>
            <img src={backArrow} />
          </button>

          <div className="row">
            <div className="col-md-6 offset-lg-3 title-raw">
              <h2 className="card-text-city">{searchParams.get('cityName')}, {searchParams.get('country')}</h2>
              <h1 className="card-text-timeDate">{searchParams.get('time')}</h1>
            </div>
          </div>

          <div className="row offset-md-2">
            <div className="detailrow">
            <div className="col-3 status-row upper-inner-box">
              <img className="cloud-img" src={cloud} />
              <p className="card-text-skyType">{searchParams.get('status')}</p>
            </div>
            <div className="col-1 top-vl"></div>
            <div className="col-3 upper-inner-box">
              <p className="card-text-temp">{searchParams.get('temp')}° c</p>
              <p className="card-text-minTemp">Temp min : {searchParams.get('mintemp')}°c</p>
              <p className="card-text-maxTemp">Temp max : {searchParams.get('maxtemp')}°c</p>
            </div>
            </div>
          </div>
        </div>

        <div className="card-lower">
          <div className="row below-detail-row col-md-3 offset-md-1">
            <div className="col-md-4">
              <div className="card card-segment">
                <div className="card-body">
                  <p className="card-text-pressure">Pressure : <span className="input-details">{searchParams.get('pressure')}Pa</span></p>
                  <p className="card-text-humidity">Humidity : <span className="input-details">{searchParams.get('humidity')}%</span></p>
                  <p className="card-text-visibility">Visibility : <span className="input-details">{searchParams.get('visibility')}km</span></p>
                </div>
              </div>
            </div>
            <div className="col-md-1 bottom-vl"></div>
            <div className="col-md-3 border-left border-right">
              <div className="card card-segment">
                <div className="card-body">
                  <div className="card-text-imgNavigation offset-md-5">
                    <img  className="navigation-img" src={navigationImg} />
                  </div>
                  <p className="card-text-wind">{searchParams.get('speed')}m/s {searchParams.get('deg')} Degree</p>
                </div>
              </div>
            </div>
            <div className="col-md-1 bottom-vl"></div>
            <div className="col-md-3">
              <div className="card card-segment sunrise-detail-col">
                <div className="card-body">
                  <p className="card-text-sunrise">Sunrise : <span className="input-details">{searchParams.get('sunrise')}</span></p>
                  <p className="card-text-sunset">Sunset : <span className="input-details">{searchParams.get('sunset')}</span></p>
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