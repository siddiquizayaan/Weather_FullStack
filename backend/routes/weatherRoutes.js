const express = require("express");
const axios = require("axios");
const router = express.Router();
const WeatherSearch = require("../models/WeatherSearch");
const { Parser } = require("json2csv");
const pdf = require("pdfkit");
const fs = require("fs");
const { js2xml } = require("xml-js");

const WEATHER_API = process.env.WEATHER_API_KEY;
const YOUTUBE_API_KEY = "AIzaSyA9UWl4crEfujDkEa_ms4hv6JsW53laEsA";

// Get current + forecast
router.post("/search", async (req, res) => {
    const { location, lat, lon, startDate, endDate } = req.body;
    
    if (!location && (!lat || !lon)) {
      return res.status(400).json({ error: "Location or coordinates (lat, lon) are required" });
    }
  
    try {
      // If no location is provided, use lat/lon directly
      let geo = { lat, lon };
      let city = location || ''; 
      
      if (location) {
        // Fallback: Use geo coding if location (city name) is provided
        const geoRes = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=5ca7137f6e2483acb53c74e773a40960`);
        const geoData = geoRes.data[0];
        
        if (!geoData) return res.status(404).json({ error: "Location not found" });
  
        geo = { lat: geoData.lat, lon: geoData.lon };
      }
      else if (lat && lon) {
        // If lat and lon are provided, use reverse geocoding to find the city name
        const geoRes = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=5ca7137f6e2483acb53c74e773a40960`);
        const geoData = geoRes.data[0];
        
        if (!geoData) return res.status(404).json({ error: "Location not found" });
  
        city = geoData.name; // Set city name from reverse geocoding result
        geo = { lat: geoData.lat, lon: geoData.lon };
      }
  
      const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${geo.lat}&lon=${geo.lon}&units=metric&appid=5ca7137f6e2483acb53c74e773a40960`);
  
      const newEntry = new WeatherSearch({
        location:  city || location,
        coordinates: geo,
        weatherData: weatherRes.data,
        dateRange: { start: startDate, end: endDate },
      });
  
      await newEntry.save();
      res.json(newEntry);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      res.status(500).json({ error: "Failed to fetch weather data", details: err.message });
    }
  });
  
  

router.get("/history", async (req, res) => {
  const data = await WeatherSearch.find().sort({ createdAt: -1 });
  res.json(data);
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await WeatherSearch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Update failed" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await WeatherSearch.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: "Delete failed" });
  }
});

router.get("/export", async (req, res) => {
  const format = req.query.format || "json";
  const data = await WeatherSearch.find();

  if (format === "json") {
    res.json(data);
  } else if (format === "csv") {
    const parser = new Parser();
    const csv = parser.parse(data);
    res.header("Content-Type", "text/csv");
    res.attachment("export.csv");
    return res.send(csv);
  } else if (format === "xml") {
    const xml = js2xml({ records: data }, { compact: true, ignoreComment: true, spaces: 4 });
    res.header("Content-Type", "application/xml");
    return res.send(xml);
  } else if (format === "pdf") {
    const doc = new pdf();
    const filename = "export.pdf";
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    doc.pipe(res);
    data.forEach(d => {
      doc.text(JSON.stringify(d), {
        paragraphGap: 10
      });
    });
    doc.end();
  } else {
    res.status(400).json({ error: "Invalid format" });
  }
});

router.get("/youtube/:city", async (req, res) => {
  const city = req.params.city;

  try {
    const ytRes = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        key: "AIzaSyA9UWl4crEfujDkEa_ms4hv6JsW53laEsA",
        q: city + "County tour",
        part: "snippet",
        maxResults: 3,
        type: "video",
      },
    });

    res.json(ytRes.data.items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch YouTube videos" });
  }
});

module.exports = router;