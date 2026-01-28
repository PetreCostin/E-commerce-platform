import axios from 'axios';

const API_URL = '/api/users';

const userService = {
  getAllUsers: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getUserById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  updateUserRole: async (id, role) => {
    const response = await axios.put(`${API_URL}/${id}/role`, { role });
    return response.data;
  },

  updateUserProfile: async (id, userData) => {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
  }
};

export default userService;
