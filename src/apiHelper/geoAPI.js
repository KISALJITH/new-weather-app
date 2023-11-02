import {API_BASE_URL, API_ENDPOINT, API_KEY, API_QUERY_PARAMS} from "./../constants/constant";

class GeoApi {
  getGeoUrl(city) {
    const queryParams = new URLSearchParams(API_QUERY_PARAMS);
    queryParams.append("q", city.CityName);
    queryParams.append("appid", API_KEY);
    return `${API_BASE_URL}${API_ENDPOINT}?${queryParams.toString()}`;
  }
}

export default GeoApi;
