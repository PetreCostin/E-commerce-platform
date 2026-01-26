const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { createPayPalOrder, capturePayPalPayment } = require('../services/paypalService');

// @desc    Create PayPal order
// @route   POST /api/payment/paypal/create
// @access  Private
router.post('/paypal/create', protect, async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const order = await createPayPalOrder(amount);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Capture PayPal payment
// @route   POST /api/payment/paypal/capture/:orderId
// @access  Private
router.post('/paypal/capture/:orderId', protect, async (req, res) => {
  try {
    const capture = await capturePayPalPayment(req.params.orderId);
    res.json(capture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get PayPal client ID
// @route   GET /api/payment/paypal/config
// @access  Public
router.get('/paypal/config', (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

module.exports = router;
