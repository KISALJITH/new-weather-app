import {OPENWEATHERMAP_API_BASE_URL, WEATHER_ENDPOINT, API_KEY, UNITS} from "./../../constants/constant";

class WeatherApi {
  getWheatherUrl(lat, lon) {
    return `${OPENWEATHERMAP_API_BASE_URL}${WEATHER_ENDPOINT}?lat=${lat}&lon=${lon}&units=${UNITS}&appid=${API_KEY}`;
  }
}

export default WeatherApi;
