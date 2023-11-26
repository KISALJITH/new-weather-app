import moment from "moment-timezone";


//Calculate sunset/sunrise time

//Sunrise time
export function getSunriseDetails(timezone, sunrise) {
    console.log(timezone+" "+sunrise)
    const sunriceTime = calculateSunTime(timezone, sunrise);
    return sunriceTime;
  }

  //Sunset time
 export function getSunsetDetails(timezone, sunset) {
    const sunsetTime = calculateSunTime(timezone, sunset);
    return sunsetTime;
  }


export  function calculateSunTime(timezone, dt) {
    const sunTime = moment
      .unix(dt + timezone)
      .tz("Etc/GMT")
      .format("HH:mm a");
    return sunTime;
  }

    //Local Time 
   export function getLocalTime(dt, timezone) {
        const formattedDateTime = moment
          .unix(dt + timezone)
          .tz("Etc/GMT")
          .format("HH:mm a MMM-DD ");
        return formattedDateTime;
      }

