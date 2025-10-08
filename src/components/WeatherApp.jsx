import { useState } from "react";
import "./WeatherApp.css";
import UmbrellaImg from "../assets/Umbrella.svg";

const WeatherApp = () => {
  const [isOpen, setIsOpen] = useState(false); // modal open state
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const descMap = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
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

  const fetchWeather = async () => {
    if (!city.trim()) return;

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || !geoData.results[0]) {
        setError("City not found");
        setWeather(null);
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();
      const current = weatherData.current_weather;

      setWeather({
        city: name,
        temperature: current.temperature,
        windspeed: current.windspeed,
        description: descMap[current.weathercode] || "Unknown",
        weathercode: current.weathercode,
      });
      setError("");
    } catch (err) {
      setError("Network error");
      setWeather(null);
    }
  };

  const weatherIcon = weather?.weathercode !== undefined && weather?.weathercode !== null
  ? new URL(`../assets/weather-icons/${weather.weathercode}.png`, import.meta.url).href
  : UmbrellaImg;

  return (
    <main>
      <section className="weather-grid">
        <article className="weather-card">
          <h2 className="section-title">
            Weather App<b className="dot">.</b>
          </h2>
          <p className="section-description">
            Built with <b>React</b>, <b>axios</b> for data fetching, and <b>React hooks</b>{" "}
            for state management. Weather data is fetched from the <b>Open-Meteo API</b>{" "}
            to provide real-time updates.
          </p>
          <p className="section-description">
            The backend is powered by <b>Node.js</b> and <b>Fastify</b>, enabling efficient handling of data requests.
          </p>
          <button className="open-btn" onClick={() => setIsOpen(true)}>
            Open
          </button>
        </article>
        <figure className="weather-img-container">
          <img loading="lazy" src={UmbrellaImg} alt="Weather illustration" />
        </figure>
      </section>

      {/* Modal */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              &times;
            </button>

            <h1 className="section-title">
              Weather App<b className="dot">.</b>
            </h1>

            <div className="search">
              <input
                className="search-bar"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search city..."
              />
              <button className="search-btn" onClick={fetchWeather}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>

            <div className="weather-info">
              {error && <p className="error">{error}</p>}
              {weather && (
                <>
                  <p>
                    <strong>City:</strong> {weather.city}
                  </p>
                  <p>
                    <strong>Temperature:</strong> {weather.temperature}°C
                  </p>
                  <p>
                    <strong>Wind:</strong> {weather.windspeed} km/h
                  </p>
                  <p>
                    <strong>Description:</strong> {weather.description}
                  </p>
                  <img src={weatherIcon} alt={weather.description} />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default WeatherApp;
