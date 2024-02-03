// routes/weather.js

const express = require('express');
const axios = require('axios');
const router = express.Router();

// Weather API endpoint
router.get('/', async (req, res) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const city = req.query.city; // Assuming city is passed as query parameter

    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const weatherData = weatherResponse.data;

    res.json(weatherData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Traffic API endpoint
router.get('/traffic', async (req, res) => {
  try {
    const apiKey = process.env.TRAFFIC_API_KEY;
    // Make a request to the traffic API endpoint
    const trafficResponse = await axios.get(`https://api.traffic.com/datafeed/v1/incidents?key=${apiKey}`);
    const trafficData = trafficResponse.data;

    res.json(trafficData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
