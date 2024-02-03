// routes/supplier.js

const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

// Get all suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a new supplier
router.post('/', async (req, res) => {
  try {
    const { name, contactInfo, location } = req.body;
    const newSupplier = new Supplier({ name, contactInfo, location });
    await newSupplier.save();
    res.json({ message: 'Supplier added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
