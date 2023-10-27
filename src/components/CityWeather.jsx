// src/components/CityWeather.js
import React, { useState, useEffect } from "react";

const CityWeather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLargeView, setIsLargeView] = useState(false);

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
      `https://api.openweathermap.org/geo/1.0/direct?q=${city.CityName}&limit=1&appid=1873603e5c3383e51ef846fd18507c00`
    )
      .then((response) => response.json())
      .then((data) => {
        const { lat, lon } = data[0];
        return fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=1873603e5c3383e51ef846fd18507c00`
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
      }
    }

    return null;
  };

  const toggleView = () => {
    setIsLargeView(!isLargeView);
  };

  return (
    <div>
      <h2>{city.CityName}</h2>
      {weatherData && (
        <div>
          <p>Icon: {weatherData.weather[0].icon} °C</p>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>temp_min: {weatherData.main.temp_min} °C</p>
          <p>temp_max: {weatherData.main.temp_max} °C</p>
          <p>pressure: {weatherData.main.pressure} °C</p>
          <p>humidity: {weatherData.main.humidity} °C</p>
          <p>visibility: {weatherData.visibility} °C</p>
          <p>Wind_speed: {weatherData.wind.speed} °C</p>
          <p>wind direc: {weatherData.wind.deg} °C</p>
          <p>Sunrice: {weatherData.sys.sunrise} °C</p>
          <p>Sunset: {weatherData.sys.sunset} °C</p>
          <p>Status: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default CityWeather;
