// routes/trafficPrediction.js

const express = require('express');
const axios = require('axios');
const router = express.Router();

// Traffic prediction API endpoint
router.get('/prediction', async (req, res) => {
  try {
    const apiKey = process.env.TRAFFIC_PREDICTION_API_KEY;
    const { origin, destination } = req.query;

    const predictionResponse = await axios.get(`https://api.trafficprediction.com/predict?origin=${origin}&destination=${destination}&key=${apiKey}`);
    const predictionData = predictionResponse.data;

    res.json(predictionData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
