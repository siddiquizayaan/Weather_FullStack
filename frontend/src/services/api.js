
/*
const API_URL = "http://localhost:5000/api/weather";

export const fetchWeatherData = async (location, startDate, endDate) => {
  try {
    const response = await fetch(`${API_URL}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location,
        startDate,
        endDate,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export const fetchWeatherHistory = async () => {
  try {
    const response = await fetch(`${API_URL}/history`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather history:", error);
    return [];
  }
};

*/

import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/weather" });

export const fetchWeather = (data) => API.post("/search", data);
export const getHistory = () => API.get("/history");
export const deleteEntry = (id) => API.delete(`/${id}`);
export const fetchYouTubeVideos = (city) =>
  API.get(`/youtube/${city}`);

export const exportData = (format) =>
  API.get(`/export?format=${format}`, { responseType: "blob" });
