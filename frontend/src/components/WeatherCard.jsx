/*import React from "react";

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return <div className="text-center">No weather data available.</div>;

  const currentWeather = weatherData.list[0]; // First forecast (current weather)

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <div className="text-center text-xl font-bold">{weatherData.location}</div>
      <div className="flex justify-center items-center space-x-4">
        <div className="text-6xl">
          <img
            src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`}
            alt={currentWeather.weather[0].description}
          />
        </div>
        <div>
          <div className="text-3xl">{currentWeather.main.temp}°C</div>
          <div>{currentWeather.weather[0].description}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
*/

import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const info = weather.weatherData?.list?.[0];
  const city = weather.weatherData?.city?.name;
  const temp = info?.main?.temp;
  const desc = info?.weather?.[0]?.description;
  const icon = info?.weather?.[0]?.icon;

  return (
    <div className="card">
      <h2>{city}</h2>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon" />
      <p>{desc}</p>
      <p>{temp} °C</p>
    </div>
  );
};

export default WeatherCard;