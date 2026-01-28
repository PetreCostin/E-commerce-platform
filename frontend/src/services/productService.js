import axios from 'axios';

const API_URL = '/api/products';

const productService = {
  getAllProducts: async (params = {}) => {
    const response = await axios.get(API_URL, { params });
    return response.data;
  },

  getProductById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await axios.post(API_URL, productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await axios.put(`${API_URL}/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },

  searchProducts: async (searchTerm) => {
    const response = await axios.get(`${API_URL}/search`, {
      params: { q: searchTerm }
    });
    return response.data;
  }
};

export default productService;
