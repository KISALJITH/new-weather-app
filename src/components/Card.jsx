import React, { useState } from "react";
import "./../styles/card.css";
import navigationImg from "./../images/navigation.png";
import cloud from "./../images/cloud.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GeoApi from "../apiHelper/geoAPI";
import WeatherApi from "../apiHelper/weatherApi";
import moment from "moment-timezone";

const Card = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const cachedData = getCachedData(city.CityCode);

    if (cachedData) {
      setWeatherData(cachedData);
    } else {
      fetchWeatherData(city);
    }
  }, [city]);

  const fetchWeatherData = (city) => {
    const geoObj = new GeoApi();
    fetch(geoObj.getGeoUrl(city))
      .then((response) => response.json())
      .then((data) => {
        const { lat, lon } = data[0];
        const wheatherObj = new WeatherApi();

        return fetch(wheatherObj.getWheatherUrl(lat, lon));
      })
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        cacheData(city.CityCode, data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  const cacheData = (key, data) => {
    const cacheTime = new Date().getTime();
    const cachedData = { data, cacheTime };
    localStorage.setItem(key, JSON.stringify(cachedData));
  };

  const getCachedData = (key, data) => {
    const cachedData = localStorage.getItem(key);

    if (cachedData) {
      const { data, cacheTime } = JSON.parse(cachedData);
      const currentTime = new Date().getTime();
      // Check if the cached data has not expired (5 minutes)
      if (currentTime - cacheTime <= 5 * 60 * 1000) {
        return data;
      } else {
        // Remove expired cached data
        localStorage.removeItem(key);
        fetchWeatherData(city);
      }
    }

    return null;
  };

  function getLocalTime() {
    const formattedDateTime = moment
      .unix(weatherData.dt + weatherData.timezone)
      .tz("Etc/GMT")
      .format("HH:mm a MMM-DD ");
    return formattedDateTime;
  }

  function calculateSunTime(time) {
    const sunTime = moment
      .unix(time + weatherData.timezone)
      .tz("Etc/GMT")
      .format("HH:mm a");
    return sunTime;
  }

  function getSunriseDetails(time) {
    const sunriceTime = calculateSunTime(time);
    return sunriceTime;
  }

  function getSunsetDetails() {
    const sunsetTime = calculateSunTime(weatherData.sys.sunset);
    return sunsetTime;
  }

  const navigate = useNavigate();
  const toggleView = () => {
    // Navigate to the city-details route with query parameters
    navigate({
      pathname: "/description",
      search: `?cityName=${city.CityName}
        &temp=${weatherData.main.temp}
        &country=${weatherData.sys.country}
        &status=${weatherData.weather[0].description}
        &mintemp=${weatherData.main.temp_min}
        &maxtemp=${weatherData.main.temp_max}
        &pressure=${weatherData.main.pressure}
        &humidity=${weatherData.main.humidity}
        &visibility=${weatherData.visibility / 1000}
        &speed=${weatherData.wind.speed}
        &time=${getLocalTime()}
        &sunrise=${getSunriseDetails(weatherData.sys.sunrise)}
        &sunset=${getSunriseDetails(weatherData.sys.sunset)}
       

        `,
    });
  };
  return (
    <div>
      {weatherData && (
        <div className="card-outer-cd" onClick={toggleView}>
          <div className="card card-inner-cd">
            <div className="card-rows col-md-6">
              <div className="card text-bg-dark-cd card-upper-cd">
                <div className="card-img-overlay">
                  <div className="container">
                    <button
                      type="button"
                      className="btn-close right-align offset-lg-11"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    ></button>
                    <div className="row upper-row">
                      <div className="col-md-6">
                        <div className="card card-segment-cd">
                          <div className="card-body-cd">
                            <p className="card-text-city-cd">
                              {weatherData.name}, {weatherData.sys.country}
                            </p>
                            <p className="card-text-timeDate-cd">
                              {getLocalTime()}
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
                              {" "}
                              {weatherData.main.temp} c
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
                  <div className="row">
                    <div className="col-md-4">
                      <div className="card card-segment-cd">
                        <div className="card-body">
                          <p className="card-text-pressure-cd">
                            Pressure:{" "}
                            <span className="input-details">
                              {weatherData.main.pressure}Pa
                            </span>
                          </p>
                          <p className="card-text-humidity-cd">
                            Humidity:{" "}
                            <span className="input-details">
                              {weatherData.main.humidity}%
                            </span>
                          </p>
                          <p className="card-text-visibility-cd">
                            Visibility:
                            <span className="input-details">
                              {weatherData.visibility / 1000}km
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 border-left border-right">
                      <div className="card card-segment-cd">
                        <div className="card-body">
                          <img
                            className="card-text-imgNavigation-cd offset-md-4"
                            src={navigationImg}
                          />
                          <p className="card-text-wind-cd">
                            {weatherData.wind.speed}m/s {weatherData.wind.deg}{" "}
                            Degree
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card card-segment-cd">
                        <div className="card-body">
                          <p className="card-text-sunrise-cd">
                            Sunrise:
                            <span className="input-details">
                              {getSunriseDetails(weatherData.sys.sunrise)}
                            </span>
                          </p>
                          <p className="card-text-sunset-cd">
                            Sunset:
                            <span className="input-details">
                              {getSunsetDetails(weatherData.sys.sunset)}
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
      )}{" "}
    </div>
  );
};

export default Card;
