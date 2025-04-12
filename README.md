# 🌦️ Fullstack Weather App

A fullstack weather dashboard that allows users to search weather by city or use their current location. It also displays relevant YouTube videos based on the searched city, and stores a history of weather searches with export options.

## 🔧 Tech Stack

- **Frontend**: React, Axios, plain CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose, Axios
- **APIs Used**:
  - OpenWeatherMap (Current + Forecast)
  - YouTube Data API v3
  - OpenWeatherMap Geocoding (reverse + forward)

## ✨ Features

- 🔍 Search weather by **city** or use **current location**
- 📺 Fetch **YouTube videos** for searched cities (city tours, travel)
- 🧾 Store and view **weather search history**
- 🗑️ **Delete** history entries
- 📁 **Export** data to JSON, CSV, XML, or PDF
- 📍 Reverse-geocode lat/lon to **city name** (done on backend)
- ⚠️ Handles errors, invalid searches, and unavailable APIs

---

## How to Run

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
``` 

### 2. Install dependencies
#### Frontend
```bash
cd frontend
npm install
```
#### Backend
``` bash
cd ../backend
npm install
```
### 3. Setup .env file (backend/.env)
  - WEATHER_API_KEY=your_openweathermap_api_key
  - YOUTUBE_API_KEY=your_youtube_api_key
  - MONGO_URI=your_mongodb_connection_string

### 4. Start The App
#### Backend
```bash
cd backend
npm run dev
```
#### Frontend
``` bash
cd ../frontned
npm start
```

