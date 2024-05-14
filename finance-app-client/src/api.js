import axios from 'axios';

// Create an instance of axios with default settings
const api = axios.create({
  baseURL: 'http://localhost:3000', // Update this to your back-end URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the token to the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
