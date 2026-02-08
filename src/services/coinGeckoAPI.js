// src/services/coinGeckoAPI.js
import apiClient from './apiClient';
import { 
  processChartData, 
  processTopPerformer,
  generateMockData 
} from '../utils/chartDataProcessor';

// Remove the old processChartData function from here
// Keep only the API calls

export const fetchHistoricalData = async (coinId = 'bitcoin', days = '7') => {
  try {
    const response = await apiClient.get(`/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days,
        interval: days === '1' ? 'hourly' : 'daily'
      }
    });
    
    if (!response.data || !response.data.prices) {
      console.warn('API returned empty data, using mock data');
      return generateMockData(days);
    }
    
    return processChartData(response.data, days);
  } catch (error) {
    console.warn('Using mock data due to API error:', error.message);
    return generateMockData(days);
  }
};

export const fetchTopGainer = async () => {
  try {
    const response = await apiClient.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'price_change_percentage_24h_desc',
        per_page: 1,
        page: 1,
        sparkline: false
      }
    });
    
    if (!response.data || response.data.length === 0) {
      console.warn('No gainer data, using mock');
      return processTopPerformer(null, 'gainer');
    }
    
    return processTopPerformer(response.data, 'gainer');
  } catch (error) {
    console.warn('Using mock gainer data:', error.message);
    return processTopPerformer(null, 'gainer');
  }
};

export const fetchTopLoser = async () => {
  try {
    const response = await apiClient.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'price_change_percentage_24h_asc',
        per_page: 1,
        page: 1,
        sparkline: false
      }
    });
    
    if (!response.data || response.data.length === 0) {
      console.warn('No loser data, using mock');
      return processTopPerformer(null, 'loser');
    }
    
    return processTopPerformer(response.data, 'loser');
  } catch (error) {
    console.warn('Using mock loser data:', error.message);
    return processTopPerformer(null, 'loser');
  }
};