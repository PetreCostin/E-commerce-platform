const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const inventoryService = require('../services/inventoryService');

// @desc    Check inventory availability
// @route   GET /api/inventory/check/:productId
// @access  Private
router.get('/check/:productId', protect, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.query;

    const result = await inventoryService.checkAvailability(
      productId,
      parseInt(quantity) || 1
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Reserve inventory
// @route   POST /api/inventory/reserve
// @access  Private
router.post('/reserve', protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const result = await inventoryService.reserveInventory(productId, quantity);
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get inventory status
// @route   GET /api/inventory/status/:productId
// @access  Private/Admin
router.get('/status/:productId', protect, admin, async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await inventoryService.getInventoryStatus(productId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update inventory
// @route   PUT /api/inventory/update
// @access  Private/Admin
router.put('/update', protect, admin, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const result = await inventoryService.updateInventory(productId, quantity);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
