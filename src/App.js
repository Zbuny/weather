
import React, { useState, useEffect } from "react";
import search_icon from "./Assets/search.png";
import clear_icon from "./Assets/clear.png";
import cloud_icon from "./Assets/cloud.png";
import drizzle_icon from "./Assets/drizzle.png";
import rain_icon from "./Assets/rain.png";
import snow_icon from "./Assets/snow.png";
import wind_icon from "./Assets/wind.png";
import humidity_icon from "./Assets/humidity.png";

const App = () => {
  return (
    <div className='app'>
      <Weather/>
    </div>
  )
}
const Weather = () => {
  const [city, setCity] = useState("Almaty");
  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState(clear_icon);
  useEffect(() => {
    getWeather(city);
  }, []);
  const getWeather = (cityName) => {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.results) {
          alert("City not found!");
          return;
        }
        let lat = data.results[0].latitude;
        let lon = data.results[0].longitude;
        let name = data.results[0].name;
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
          .then((res) => res.json())
          .then((data) => {
            setWeather({ ...data.current_weather, name });
            let code = data.current_weather.weathercode;
            if (code === 0) setIcon(clear_icon);
            else if (code >= 1 && code <= 3) setIcon(cloud_icon);
            else if (code >= 45 && code <= 48) setIcon(drizzle_icon);
            else if (code >= 51 && code <= 67) setIcon(rain_icon);
            else if (code >= 71 && code <= 77) setIcon(snow_icon);
          });
      })
      .catch(() => alert("Error loading data!"));
  };
  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="Enter city..." value={city} onChange={(e) => setCity(e.target.value)} />
        <img src={search_icon} alt="search" onClick={() => getWeather(city)} />
      </div>
      {weather && (
        <>
          <img src={icon} alt="weather-icon" className="weather-icon" />
          <p className="temperature">{weather.temperature}°C</p>
          <p className="location">{weather.name}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidity" />
              <div>
                <p>{weather.relative_humidity ? `${weather.relative_humidity}%` : "—"}</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="wind" />
              <div>
                <p>{weather.windspeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};


export default App