// routes/stockData.js

const express = require('express');
const router = express.Router();
const StockData = require('../models/StockData');

// Add new stock data point
router.post('/', async (req, res) => {
  try {
    const { product, demandForecast, leadTime, currentInventory, reorderPoint, optimumStock } = req.body;
    const newStockData = new StockData({
      product,
      demandForecast,
      leadTime,
      currentInventory,
      reorderPoint,
      optimumStock,
    });
    await newStockData.save();
    res.json({ message: 'Stock data point added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
