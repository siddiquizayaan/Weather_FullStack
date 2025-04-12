const mongoose = require("mongoose");

const WeatherSearchSchema = new mongoose.Schema({
  location: String,
  coordinates: {
    lat: Number,
    lon: Number
  },
  weatherData: Object,
  dateRange: {
    start: Date,
    end: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("WeatherSearch", WeatherSearchSchema);