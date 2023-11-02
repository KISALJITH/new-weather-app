import React, { useState } from "react";
import "./../styles/card.css";
import navigationImg from "./../images/navigation.png";
import cloud from "./../images/cloud.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { API_BASE_URL, API_ENDPOINT, API_QUERY_PARAMS, API_KEY} from "../apiHelper/geoAPI";
import GeoApi from "../apiHelper/geoAPI";
import WeatherApi from "../apiHelper/weatherApi";
import { OPENWEATHERMAP_API_BASE_URL, WEATHER_ENDPOINT, UNITS} from "../apiHelper/weatherApi";

// const apiKey = process.env.REACT_APP_API_KEY;

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
    const geoObj =new GeoApi();
    fetch(
      // apiUrl
      geoObj.getGeoUrl(city)
      )
      .then((response) => response.json())
      .then((data) => {
        const { lat, lon } = data[0];
        const wheatherObj = new WeatherApi();

        // const apiWeatherUrl = wheatherObj.getWeatherUrl(lat, lon)

        // const apiWeatherUrl = `${OPENWEATHERMAP_API_BASE_URL}${WEATHER_ENDPOINT}?lat=${lat}&lon=${lon}&units=${UNITS}&appid=${apiKey}`;

        return fetch(wheatherObj.getWheatherUrl(lat, lon));
      })
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        getCachedData(city.CityCode, data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  const getCachedData = (key) => {
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

  function getDateDetails() {
    const date = getLocalTime();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return {
      month,
      day,
      hours,
      minutes,
    };
  }

  function getLocalTime() {
    const x = Date.now();
    const dt = x / 1000; // Convert Unix timestamp to milliseconds
    const timezoneOffsetSeconds = weatherData.timezone;
    const localTimeMilliseconds = dt + timezoneOffsetSeconds * 1000;

    return new Date(localTimeMilliseconds);
  }

  function getSunriseDetails() {
    const date = getsunrise();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return {
      hours,
      minutes,
    };
  }

  function getsunrise() {
    const x = weatherData.sys.sunrise;
    const y = weatherData.timezone;
    const dt = x * 1000; 
    const timezoneOffsetSeconds = y;
    const localTimeMilliseconds = x + timezoneOffsetSeconds * 1000;

    return new Date(localTimeMilliseconds);
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
        &hour=${getDateDetails().hours}
        &min=${getDateDetails().minutes}
        &day=${getDateDetails().day}

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
                              {getDateDetails().hours} :
                              {getDateDetails().minutes}am, Oct{" "}
                              {getDateDetails().day}
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
                              {getSunriseDetails().hours} :
                              {getSunriseDetails().minutes} am
                            </span>
                          </p>
                          <p className="card-text-sunset-cd">
                            Sunset:
                            <span className="input-details">
                              {getDateDetails(weatherData.sys.sunset).hours} :
                              {getDateDetails(weatherData.sys.sunset).minutes}pm
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
