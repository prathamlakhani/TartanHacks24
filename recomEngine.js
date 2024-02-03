// services/optimumStock.js

const calculateOptimumStock = (demandForecast, leadTime, currentInventory, reorderPoint) => {
  // Add your logic here to calculate optimum stock levels
  // Example: Optimum stock = (Demand forecast * Lead time) + Safety stock
  const safetyStock = 10; // Example: Set a safety stock level
  const optimumStock = (demandForecast * leadTime) + safetyStock;
  return optimumStock;
};

module.exports = calculateOptimumStock;


// routes/stockData.js

const express = require('express');
const router = express.Router();
const StockData = require('../models/StockData');
const calculateOptimumStock = require('../services/optimumStock');

// Add new stock data point
router.post('/', async (req, res) => {
  try {
    const { product, demandForecast, leadTime, currentInventory, reorderPoint } = req.body;
    const optimumStock = calculateOptimumStock(demandForecast, leadTime, currentInventory, reorderPoint);
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

