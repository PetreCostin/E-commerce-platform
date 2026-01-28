import axios from 'axios';

const API_URL = '/api/categories';

const categoryService = {
  getAllCategories: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getCategoryById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createCategory: async (categoryData) => {
    const response = await axios.post(API_URL, categoryData);
    return response.data;
  },

  updateCategory: async (id, categoryData) => {
    const response = await axios.put(`${API_URL}/${id}`, categoryData);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};

export default categoryService;
