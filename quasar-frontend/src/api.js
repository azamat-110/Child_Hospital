import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api', // Базовый URL для API
  timeout: 10000, // Таймаут 10 секунд
});

export default apiClient;
