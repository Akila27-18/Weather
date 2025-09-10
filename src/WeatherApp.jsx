import React, { useState, useEffect, useContext } from "react";
import { TemperatureContext } from "./TemperatureContext";

const API_KEY = "1629339efa16dcd38b62dbef852ce5a1"; // ⚡ Use your own API key

const WeatherApp = () => {
  const { unit, toggleUnit } = useContext(TemperatureContext);

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Detect user's location on first load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => {
        // If user denies geolocation, default to blank
      }
    );
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) throw new Error(data.message);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const fetchWeatherByCity = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) throw new Error(data.message);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

const getTemperature = (tempC) =>
  unit === "C"
    ? `${tempC.toFixed(1)} °C`
    : `${((tempC * 9) / 5 + 32).toFixed(1)} °F`;


  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Weather App</h1>

        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter city"
            className="flex-grow px-4 py-2 border rounded-l"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={fetchWeatherByCity}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        <button
          onClick={toggleUnit}
          className="mb-4 px-4 py-2 bg-gray-700 text-white rounded"
        >
          Toggle °C / °F (Current: {unit})
        </button>

        {loading && <p className="text-center">Loading...</p>}

        {error && (
          <p className="text-red-500 text-center font-semibold">{error}</p>
        )}

        {weather && !loading && (
          <div className="bg-blue-200 p-4 rounded mt-4 text-center">
            <h2 className="text-xl font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>
            <p>Temperature: {getTemperature(weather.main.temp)}</p>
            <p>Humidity: {weather.main.humidity} %</p>
            <p>Weather: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
