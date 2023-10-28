import React, { useState } from "react";
import "./../styles/card.css";
import backgroundImg from "./../images/Rectangle.png";
import navigationImg from "./../images/navigation.png";
import cloud from "./../images/cloud.png";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const cachedData = getCachedData(city.CityCode);

    if (cachedData) {
      setWeatherData(cachedData);
    } else {
      // Fetch data if not cached
      fetchWeatherData(city);
    }
  }, [city]);

  const fetchWeatherData = (city) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city.CityName}&limit=1&appid=1b9025c8807b39fb51111690d8e3022f`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const { lat, lon } = data[0];
        return fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=1b9025c8807b39fb51111690d8e3022f`
        );
      })
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        // Cache the data with a 5-minute expiration
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
    const date = new Date(weatherData.dt*1000);

    const month = date.getMonth() + 1; // Months are zero-indexed, so we add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return date;
  }

  function getLocalTime() {
     const x = Date.now();
    const dt = x / 1000; // Convert Unix timestamp to milliseconds
    const timezoneOffsetSeconds = weatherData.timezone;
    const localTimeMilliseconds = dt + timezoneOffsetSeconds * 1000;

    return new Date(localTimeMilliseconds);
  }

  function createMonth() {
    var day = new Date(Date.now() * 1000);
        let options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",}
        return day.toLocaleString("en-us", { month: "long" }); // Friday
}
function createDay() {
  var day = new Date(Date.now() * 1000);
      let options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",}
      return day.toLocaleString("en-us", { day: "long" }); // Friday
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
        &deg=${weatherData.wind.deg}

        `,
    });
  };
  return (
    <div>
      {weatherData && (
        <div className="card-outer-cd" onClick={toggleView}>
          <div className="card card-inner-cd">
            <div className="card-rows col-md-6">
              <div class="card text-bg-dark-cd card-upper-cd">
                <div class="card-img-overlay">
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
                              {/* {getLocalTime().toDateString()} : */}
                              {getLocalTime().minutes}am,{" "}
                              {createMonth()} {createDay()}
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
                              {/* {getSunriseDetails().hours} :
                              {getSunriseDetails().minutes} am */}
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
