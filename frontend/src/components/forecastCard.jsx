/*import React from "react";

const ForecastCard = ({ forecast }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <div className="text-center font-semibold">{forecast.date}</div>
      <div className="flex justify-center items-center space-x-4">
        <div className="text-3xl">
          <img
            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png`}
            alt={forecast.weather[0].description}
          />
        </div>
        <div>
          <div>{forecast.temp}°C</div>
          <div>{forecast.description}</div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
*/

import React from "react";

const ForecastCard = ({ forecast }) => {
  if (!forecast) return null;

  const items = forecast.weatherData?.list?.slice(1, 6 * 8).filter((_, idx) => idx % 8 === 0); // 5-day forecast (8 intervals per day)

  return (
    <div>
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {items.map((item, idx) => (
          <div key={idx} className="card">
            <p><strong>{new Date(item.dt_txt).toLocaleDateString()}</strong></p>
            <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="icon" />
            <p>{item.main.temp} °C</p>
            <p>{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};