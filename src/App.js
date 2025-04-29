import React, { useState, useEffect } from "react";
import {HashRouter, Route, Routes, Link, useNavigate, } from "react-router-dom";
import CitiesList from "./CitiesList";
import searchIcon from "./Assets/search.png";
import clearIcon from "./Assets/clear.png";
import cloudIcon from "./Assets/cloud.png";
import drizzleIcon from "./Assets/drizzle.png";
import rainIcon from "./Assets/rain.png";
import snowIcon from "./Assets/snow.png";
import windIcon from "./Assets/wind.png";
import humidityIcon from "./Assets/humidity.png";
import Login from "./components/Login";
import Register from "./components/Register";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Star = ({ selected, onClick }) => (
  <span
    onClick={onClick}
    style={{
      cursor: "pointer",
      color: selected ? "gold" : "gray",
      fontSize: "24px",
      flexDirection: "row",
    }}
  >
    ★
  </span>
);

const StarRating = ({ totalStars = 5 }) => {
  const [starsSelected, setStarsSelected] = useState(0);
  return (
    <div className="rating">
      <p>Rate the weather forecast:</p>
      {[...Array(totalStars)].map((_, i) => (
        <Star
          key={i}
          selected={i < starsSelected}
          onClick={() => setStarsSelected(i + 1)}
        />
      ))}
      <p>
        {starsSelected} out of {totalStars} stars
      </p>
      <Link to="/">Back</Link>
    </div>
  );
};

const Weather = () => {
  const [city, setCity] = useState("Almaty");
  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState(clearIcon);
  const navigate = useNavigate();

  useEffect(() => {
    getWeather(city);
  }, []);

  const getWeather = (cityName) => {
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.results) {
          alert("City not found!");
          return;
        }
        const { latitude, longitude, name } = data.results[0];
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        )
          .then((res) => res.json())
          .then((data) => {
            setWeather({ ...data.current_weather, name });
            const code = data.current_weather.weathercode;
            if (code === 0) setIcon(clearIcon);
            else if (code >= 1 && code <= 3) setIcon(cloudIcon);
            else if (code >= 45 && code <= 48) setIcon(drizzleIcon);
            else if (code >= 51 && code <= 67) setIcon(rainIcon);
            else if (code >= 71 && code <= 77) setIcon(snowIcon);
          });
      })
      .catch(() => alert("Error loading data!"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(city);
  };

  return (
    <div className="weather">
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">
          <img src={searchIcon} alt="search" />
        </button>
      </form>

      {weather && (
        <>
          <img src={icon} alt="weather-icon" className="weather-icon" />
          <p className="temperature">{weather.temperature}°C</p>
          <p className="location">{weather.name}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidityIcon} alt="humidity" />
              <div>
                <p>
                  {weather.relative_humidity
                    ? `${weather.relative_humidity}%`
                    : "—"}
                </p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={windIcon} alt="wind" />
              <div>
                <p>{weather.windspeed} km/h</p>
                <span>Wind speed</span>
              </div>
            </div>
          </div>

          <button className="rate-button" onClick={() => navigate("/rate")}>
            Rate forecast
          </button>
        </>
      )}
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <HashRouter>
      <div className="app">
<div className="dropdown">
  <button
    className="dropdown-toggle"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    ☰ Menu
  </button>
  <div className={`dropdown-menu ${menuOpen ? "show" : ""}`}>
    <Link to="/" className="nav-btn">Home</Link>
    <Link to="/cities" className="nav-btn">Cities List</Link>
    {!user && (
      <>
        <Link to="/login" className="nav-btn">Login</Link>
        <Link to="/register" className="nav-btn">Register</Link>
      </>
    )}
    {user && (
      <button onClick={logout} className="nav-btn">Logout</button>
    )}
  </div>
</div>
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/rate" element={<StarRating />} />
          <Route path="/cities" element={<CitiesList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
