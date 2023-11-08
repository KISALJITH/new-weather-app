import { cacheData } from "../casheData";
import GeoApi from "./geoAPI";
import WeatherApi from "./weatherApi";

export const fetchWeatherData = (city) => {
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
      cacheData(city.CityCode, data);
      return data;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
};
