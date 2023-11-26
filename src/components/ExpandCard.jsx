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

            <div className="title-raw justify-content-center">
              <h2 className="card-text-city">{searchParams.get('cityName')}, {searchParams.get('country')}</h2>
              <h1 className="card-text-timeDate">{searchParams.get('time')}</h1>
            </div>

          <div className="row ">
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
          <div className="row below-detail-row col-md-3 ">
            <div className="col-md-3 ex-footer-segment">
              <div className="card card-segment">
                <div className="card-body">
                  <p>Pressure : <span className="input-details">{searchParams.get('pressure')}Pa</span></p>
                  <p>Humidity : <span className="input-details">{searchParams.get('humidity')}%</span></p>
                  <p>Visibility : <span className="input-details">{searchParams.get('visibility')}km</span></p>
                </div>
              </div>
            </div>
            <div className="col-md-1 bottom-vl"></div>
            <div className="col-md-3 border-left border-right ex-footer-segment">
              <div className="card card-segment">
                <div className="card-body">
                  <div className="card-text-imgNavigation">
                    <img  className="navigation-img" src={navigationImg} />
                  </div>
                  <p>{searchParams.get('speed')}m/s {searchParams.get('deg')} Degree</p>
                </div>
              </div>
            </div>
            <div className="col-md-1 bottom-vl"></div>
            <div className="col-md-3 ex-footer-segment ">
              <div className="card card-segment sunrise-detail-col">
                <div className="card-body">
                  <p>Sunrise : <span className="input-details">{searchParams.get('sunrise')}</span></p>
                  <p>Sunset : <span className="input-details">{searchParams.get('sunset')}</span></p>
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