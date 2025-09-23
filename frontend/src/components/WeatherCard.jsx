import { useState } from "react";
import "./WeatherCard.css";
import ReporterImg from "../assets/Reporter.svg";

const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city.trim()) return;

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
      const res = await fetch(`${BACKEND_URL}/weather?city=${encodeURIComponent(city)}`);
      const data = await res.json();

      setWeather(data);
    } catch (err) {
      setWeather({ error: "Network error" });
    }
  };

  const weatherDescription = (code) => {
    const map = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      61: "Rain",
      63: "Moderate rain",
      65: "Heavy rain",
      71: "Snow",
      73: "Moderate snow",
      75: "Heavy snow",
      80: "Rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      95: "Thunderstorm",
      99: "Hail",
    };
    return map[code] || "Unknown";
  };

  const cityName = weather?.city || (weather?.error ? "City not found" : "Fin City");
  const temperature = weather?.temperature != null ? `${weather.temperature}°C` : "N/A°C";
  const wind = weather?.windspeed ?? "N/A";

  const weatherIcon =
    weather && weather.weathercode != null
      ? new URL(`../assets/weather-icons/${weather.weathercode}.png`, import.meta.url).href
      : ReporterImg;

  return (
    <div className="weather-container">
      <article className="weather-card">
        {/* Search Bar */}
        <section className="search">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search city..."
            className="search-bar"
          />
          <div className="search-icon" onClick={fetchWeather}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </section>

        {/* Weather Info */}
        <section className="celcius">{temperature}</section>
        <section className="city-name">
          <i className="fa-solid fa-location-dot"></i> {cityName}
        </section>
        <section className="wind-speed">
          <i className="fa-solid fa-wind"></i> {wind} km/h
        </section>
      </article>

      <article className="weather-image">
        <div className="reporter-image">
          <img
            src={weatherIcon}
            alt={weather ? weatherDescription(weather.weathercode) : "Reporter"}
          />
        </div>
      </article>
    </div>
  );
};

export default WeatherCard;
