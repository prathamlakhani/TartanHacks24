// models/StockData.js

const mongoose = require('mongoose');

const StockDataSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  demandForecast: {
    type: Number,
    required: true,
  },
  leadTime: {
    type: Number,
    required: true,
  },
  currentInventory: {
    type: Number,
    required: true,
  },
  reorderPoint: {
    type: Number,
    required: true,
  },
  optimumStock: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('StockData', StockDataSchema);
