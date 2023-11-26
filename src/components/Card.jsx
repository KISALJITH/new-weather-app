import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getLocalTime,
  getSunsetDetails,
  getSunriseDetails,
} from "./../services/functions/timeCalculation";
import { RandomColor } from "./../services/functions/colorSelector";
import "./../styles/card.css";
import navigationImg from "./../images/navigation.png";
import cloud from "./../images/cloud.png";
import { getCachedData } from "../services/casheData";
import { fetchWeatherData } from "../services/apiHelper/fetchApi";

function Card(props) {
  console.log(props);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const cachedData = getCachedData(props.city);
    console.log(cachedData);
    if (cachedData) {
      setWeatherData(cachedData);
    } else {
      setWeatherData(fetchWeatherData(props.city));
    }
  }, []);

  const navigate = useNavigate();
  const toggleView = () => {
    // Navigate to the city-details route with query parameters
    navigate({
      pathname: "/description",
      search: `?cityName=${props.city.CityName}
        &temp=${weatherData.main.temp}
        &country=${weatherData.sys.country}
        &status=${weatherData.weather[0].description}
        &mintemp=${weatherData.main.temp_min}
        &maxtemp=${weatherData.main.temp_max}
        &pressure=${weatherData.main.pressure}
        &humidity=${weatherData.main.humidity}
        &visibility=${weatherData.visibility / 1000}
        &speed=${weatherData.wind.speed}
        &deg=${weatherData.wind.deg}
        &time=${getLocalTime(weatherData.dt, weatherData.timezone)}
        &sunrise=${getSunriseDetails(
          weatherData.timezone,
          weatherData.sys.sunrise
        )}
        &sunset=${getSunsetDetails(
          weatherData.timezone,
          weatherData.sys.sunset
        )}
       
        `,
    });
  };
  return (
    <div>
      {weatherData && (
        <div className="card-outer-cd" onClick={toggleView}>
          <div className="card card-inner-cd">
            <div className="card-rows col-md-6">
              <div
                className="card text-bg-dark-cd card-upper-cd"
                style={{ backgroundColor: RandomColor() }}
              >
                <div className="card-img-overlay">
                  <div className="container">
                    <div className="close-btn">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    ></button>
                    </div>
                    <div className="row upper-row">
                      <div className="col-md-6">
                        <div className="card card-segment-cd">
                          <div className="card-body-cd">
                            <p className="card-text-city-cd">
                              {weatherData.name}, {weatherData.sys.country}
                            </p>
                            <p className="card-text-timeDate-cd">
                              {getLocalTime(
                                weatherData.dt,
                                weatherData.timezone
                              )}
                            </p>
                            <div className="status-details">
                              <img className="cloud-img " src={cloud} />
                              <p className="card-text-skyType-cd">
                                {weatherData.weather[0].description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="card card-segment-cd">
                          <div className="card-body-cd">
                            <p className="card-text-temp-cd">
                              {weatherData.main.temp}°c
                            </p>
                            <p className="card-text-minTemp-cd">
                              Temp min: {weatherData.main.temp_min}°c
                            </p>
                            <p className="card-text-maxTemp-cd">
                              Temp max: {weatherData.main.temp_max}°c
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-lower-cd">
                <div className="container">
                  <div className="row card-footer">
                    <div className="col-md-4 border-end  footer-segment">
                      <div className="card card-segment-cd">
                        <div className="card-body">
                          <p>
                            Pressure:{" "}
                            <span className="input-details">
                              {weatherData.main.pressure}Pa
                            </span>
                          </p>
                          <p>
                            Humidity:{" "}
                            <span className="input-details">
                              {weatherData.main.humidity}%
                            </span>
                          </p>
                          <p>
                            Visibility:
                            <span className="input-details">
                              {weatherData.visibility / 1000}km
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 border-end footer-segment">
                      <div className="card card-segment-cd">
                          <img
                            className="card-text-imgNavigation-cd "
                            src={navigationImg}
                          />
                          <p>
                            {weatherData.wind.speed}m/s {weatherData.wind.deg}{" "}
                            Degree
                          </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card card-segment-cd">
                        <div className="card-body">
                          <p>
                            Sunrise:
                            <span className="input-details">
                              {getSunriseDetails(
                                weatherData.timezone,
                                weatherData.sys.sunrise
                              )}
                            </span>
                          </p>
                          <p>
                            Sunset:
                            <span className="input-details">
                              {getSunsetDetails(
                                weatherData.timezone,
                                weatherData.sys.sunset
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
