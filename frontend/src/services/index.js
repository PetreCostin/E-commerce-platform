import api from './api'

export const authService = {
  register(userData) {
    return api.post('/auth/register', userData)
  },

  login(credentials) {
    return api.post('/auth/login', credentials)
  },

  getProfile() {
    return api.get('/auth/profile')
  },

  updateProfile(userData) {
    return api.put('/auth/profile', userData)
  }
}

export const productService = {
  getProducts(params = {}) {
    return api.get('/products', { params })
  },

  getProduct(id) {
    return api.get(`/products/${id}`)
  },

  createProduct(productData) {
    return api.post('/products', productData)
  },

  updateProduct(id, productData) {
    return api.put(`/products/${id}`, productData)
  },

  deleteProduct(id) {
    return api.delete(`/products/${id}`)
  }
}

export const orderService = {
  createOrder(orderData) {
    return api.post('/orders', orderData)
  },

  getOrder(id) {
    return api.get(`/orders/${id}`)
  },

  getMyOrders() {
    return api.get('/orders/myorders')
  },

  getAllOrders() {
    return api.get('/orders')
  },

  updateOrderToPaid(id, paymentResult) {
    return api.put(`/orders/${id}/pay`, paymentResult)
  },

  updateOrderStatus(id, status) {
    return api.put(`/orders/${id}/status`, { status })
  }
}

export const paymentService = {
  createPayPalOrder(amount) {
    return api.post('/payment/paypal/create', { amount })
  },

  capturePayPalPayment(orderId) {
    return api.post(`/payment/paypal/capture/${orderId}`)
  },

  getPayPalConfig() {
    return api.get('/payment/paypal/config')
  }
}

export const inventoryService = {
  checkAvailability(productId, quantity) {
    return api.get(`/inventory/check/${productId}`, { params: { quantity } })
  },

  reserveInventory(productId, quantity) {
    return api.post('/inventory/reserve', { productId, quantity })
  },

  getInventoryStatus(productId) {
    return api.get(`/inventory/status/${productId}`)
  },

  updateInventory(productId, quantity) {
    return api.put('/inventory/update', { productId, quantity })
  }
}
