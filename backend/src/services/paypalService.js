const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

// PayPal environment
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (process.env.PAYPAL_MODE === 'production') {
    return new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret);
  } else {
    return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
  }
}

// PayPal client
function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

// Create PayPal order
const createPayPalOrder = async (amount) => {
  const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: amount.toFixed(2),
      },
    }],
  });

  try {
    const order = await client().execute(request);
    return {
      id: order.result.id,
      status: order.result.status,
    };
  } catch (error) {
    console.error('PayPal Error:', error);
    throw new Error('Failed to create PayPal order');
  }
};

// Capture PayPal payment
const capturePayPalPayment = async (orderId) => {
  const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client().execute(request);
    return {
      id: capture.result.id,
      status: capture.result.status,
      payer: capture.result.payer,
      purchase_units: capture.result.purchase_units,
    };
  } catch (error) {
    console.error('PayPal Capture Error:', error);
    throw new Error('Failed to capture PayPal payment');
  }
};

module.exports = {
  createPayPalOrder,
  capturePayPalPayment,
};
