import { fetchWeatherData } from "./apiHelper/fetchApi";

export const getCachedData = (city) => {
  const cachedData = localStorage.getItem(city.CityCode);

  if (cachedData) {
    const { data, cacheTime } = JSON.parse(cachedData);
    const currentTime = new Date().getTime();

    // Check if the cached data has not expired (5 minutes)
    if (currentTime - cacheTime <= 5 * 60 * 1000) {
      return data;
    } else {
      // Remove expired cached data
      localStorage.removeItem(city.Citycode);
      fetchWeatherData(city);
    }
  }
  return null;
};

export const cacheData = (key, data) => {
  const cacheTime = new Date().getTime();
  const cachedData = { data, cacheTime };
  localStorage.setItem(key, JSON.stringify(cachedData));
};
