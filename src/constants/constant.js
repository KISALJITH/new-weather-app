// geoAPI.js
export const API_BASE_URL = "https://api.openweathermap.org/geo/1.0";
export const API_ENDPOINT = "/direct";
export const API_KEY = process.env.REACT_APP_API_KEY;
export const API_QUERY_PARAMS = {limit: 1,};

//weatherApi.js
export const OPENWEATHERMAP_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
export const WEATHER_ENDPOINT = '/weather';
export const UNITS = 'metric';