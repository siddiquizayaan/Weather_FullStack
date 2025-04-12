/*import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import LocationButton from "./components/LocationButton";
import ExportButtons from "./components/Export";
import HistoryList from "./components/HistoryList";
import { fetchWeatherByLocation, fetchHistory } from "./services/api";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [history, setHistory] = useState([]);

  const getWeather = async (location) => {
    const result = await fetchWeatherByLocation(location);
    if (result) {
      setWeather(result.weatherData);
      setForecast(result.weatherData.list);
      loadHistory();
    }
  };

  const loadHistory = async () => {
    const data = await fetchHistory();
    setHistory(data);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 to-blue-400 p-4 text-gray-900">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Weather App ☀️</h1>
        <SearchBar onSearch={getWeather} />
        <LocationButton onDetect={getWeather} />
        {weather && <WeatherCard weather={weather} />}
        {forecast.length > 0 && <ForecastCard forecast={forecast} />}
        <ExportButtons />
        <HistoryList history={history} onRefresh={loadHistory} />
      </div>
    </div>
  );
}

export default App;

*/

import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import LocationButton from "./components/LocationButton";
import WeatherCard from "./components/WeatherCard";
import Export from "./components/Export";
import HistoryList from "./components/HistoryList";
import forecastCard from "./components/forecastCard";
import YouTubeVideos from "./components/YouTubeVideos";
import { fetchWeather, getHistory, deleteEntry, exportData, fetchYouTubeVideos } from "./services/api";




const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [ytVideos, setYtVideos] = useState([]);

  const loadHistory = async () => {
    const res = await getHistory();
    setHistory(res.data);
  };

  const handleSearch = async (location) => {
    const res = await fetchWeather({ location });
    setCurrentWeather(res.data);
    loadHistory();
  
    const city = res.data?.weatherData?.city?.name;
    if (city) {
      const ytRes = await fetchYouTubeVideos(city);
      setYtVideos(ytRes.data);
    }
  };
  
  const handleGeoSearch = async (lat, lon) => {
    setYtVideos([]);
    const res = await fetchWeather({ lat, lon });
    setCurrentWeather(res.data);

    loadHistory();
    const city = res.data?.weatherData?.city?.name;
    if (city) {
      const ytRes = await fetchYouTubeVideos(city);
      setYtVideos(ytRes.data);
    }
  };
  

  const handleDelete = async (id) => {
    await deleteEntry(id);
    loadHistory();
  };

  const handleExport = async (format) => {
    const res = await exportData(format);
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `weather_export.${format}`);
    document.body.appendChild(link);
    link.click();
  };
  

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="container">
      <h1>Weather App </h1>
      <h2> Name: Zayaan Husain Siddiqui</h2>
      <h3>The Product Manager Accelerator Program is designed to support PM professionals through every stage of their careers. From students looking for entry-level jobs to Directors looking to take on a leadership role, this program has helped over hundreds of students fulfill their career aspirations.</h3>
      <p style={{ textAlign: "center", marginBottom: "10px" }}> Search weather by city or use your location.</p>
      <SearchBar onSearch={handleSearch} />
      <LocationButton onDetect={handleGeoSearch} />
      <WeatherCard weather={currentWeather} />
      <forecastCard forecast={currentWeather} />
      <YouTubeVideos videos={ytVideos} />
      <Export onExport={handleExport} />
      <HistoryList history={history} onDelete={handleDelete} />
    </div>
  );
};

export default App;
