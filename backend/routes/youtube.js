// routes/youtube.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

router.get("/:city", async (req, res) => {
  const { city } = req.params;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`, {
        params: {
          q: `${city} travel`,
          key: AIzaSyA9UWl4crEfujDkEa_ms4hv6JsW53laEsA,
          part: "snippet",
          maxResults: 5,
          type: "video"
        }
      }
    );
    res.json(response.data.items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch YouTube videos", details: err.message });
  }
});

module.exports = router;
