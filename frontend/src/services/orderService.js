import axios from 'axios';

const API_URL = '/api/orders';

const orderService = {
  createOrder: async (orderData) => {
    const response = await axios.post(API_URL, orderData);
    return response.data;
  },

  getUserOrders: async () => {
    const response = await axios.get(`${API_URL}/my-orders`);
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  getAllOrders: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  updateOrderStatus: async (id, status) => {
    const response = await axios.put(`${API_URL}/${id}/status`, { status });
    return response.data;
  }
};

export default orderService;
