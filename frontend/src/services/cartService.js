import axios from 'axios';

const API_URL = '/api/cart';

const cartService = {
  getCart: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  addToCart: async (productId, quantity = 1) => {
    const response = await axios.post(`${API_URL}/add`, {
      productId,
      quantity
    });
    return response.data;
  },

  updateCartItem: async (productId, quantity) => {
    const response = await axios.put(`${API_URL}/update`, {
      productId,
      quantity
    });
    return response.data;
  },

  removeFromCart: async (productId) => {
    const response = await axios.delete(`${API_URL}/remove/${productId}`);
    return response.data;
  },

  clearCart: async () => {
    const response = await axios.delete(`${API_URL}/clear`);
    return response.data;
  }
};

export default cartService;
