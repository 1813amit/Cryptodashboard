// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 10000, // Increased timeout
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add cache-busting and reduce requests
    const now = Date.now();
    config.params = {
      ...config.params,
      _t: Math.floor(now / 60000) // Change every minute
    };
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor with better error messages
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'Network error';
    
    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Request timeout. The API is taking too long to respond.';
    } else if (error.response) {
      switch (error.response.status) {
        case 429:
          errorMessage = 'API rate limit reached. Free tier allows 10-30 calls/minute.';
          break;
        case 404:
          errorMessage = 'Data not found. The cryptocurrency might not exist.';
          break;
        default:
          errorMessage = `API Error: ${error.response.status}`;
      }
    } else if (error.request) {
      errorMessage = 'No response from server. Check your internet connection.';
    }
    
    error.message = errorMessage;
    return Promise.reject(error);
  }
);

export default apiClient;