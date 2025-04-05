import React, { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import "./App.css";

const cities = ["Almaty", "Astana", "Shymkent", "Aktobe", "Karaganda", "Pavlodar", 
    "Taraz", "Oral", "Kostanay", "Petropavl", "Kyzylorda", "Semey", "Atyrau", 
    "Taldykorgan", "Turkistan", "Ekibastuz", "Temirtau", "Zhezkazgan", "Kokshetau", "Stepnogorsk"];

const CityWeather = ({ index, style }) => {
  const [weather, setWeather] = useState(null);
  const name = cities[index];

  useEffect(() => {
    const getWeather = async () => {
      try {
        const res1 = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1`);
        const data1 = await res1.json();
        if (!data1.results) return;

        const lat = data1.results[0].latitude;
        const lon = data1.results[0].longitude;

        const res2 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data2 = await res2.json();
        setWeather(data2.current_weather);
      } catch (e) {
        console.error("Error loading weather", e);
      }
    };
    getWeather();
  }, [name]);

  return (
    <div className="city-weather" style={{ ...style, padding: "10px", borderBottom: "1px solid #ccc" }}>
      <strong>{name}</strong>
      {weather ? (
        <p>🌡 {weather.temperature}°C | 💨 {weather.windspeed} km/h</p>
      ) : (
        <p>Loaading...</p>
      )}
    </div>
  );
};

const CitiesList = () => (
  <div className="cities-list">
    <h2>Forecast for City</h2>
    <List
      height={400}
      itemCount={cities.length}
      itemSize={80}
      width={"100%"}
    >
      {CityWeather}
    </List>
  </div>
);

export default CitiesList;
