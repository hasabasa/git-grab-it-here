import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const kaspiApi = {
  async authenticate(userId, email, password) {
    try {
      const response = await axios.post(`${API_URL}/kaspi/auth`, {
        user_id: userId,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Ошибка авторизации');
    }
  },

  async getStores(userId) {
    try {
      const response = await axios.get(`${API_URL}/kaspi/stores`, {
        params: { user_id: userId },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Ошибка получения магазинов');
    }
  }
};
