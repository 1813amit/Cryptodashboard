// src/services/coinGeckoAPI.js
import apiClient from './apiClient';
import { 
  processChartData, 
  processTopPerformer,
  generateMockData,
  generateMockTopPerformer  // Make sure this is imported
} from '../utils/chartDataProcessor';

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

// UPDATED: Fetch both gainer and loser from a single call to ensure different data
export const fetchMarketLeaders = async () => {
  try {
    // Fetch top 30 coins to get a good sample
    const response = await apiClient.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 30,
        page: 1,
        sparkline: false,
        price_change_percentage: '24h'
      }
    });
    
    if (!response.data || response.data.length === 0) {
      console.warn('API returned empty data, using mock leaders');
      return {
        topGainer: generateMockTopPerformer('gainer'),
        topLoser: generateMockTopPerformer('loser')
      };
    }
    
    const coins = response.data.filter(coin => 
      coin.price_change_percentage_24h !== null && 
      coin.current_price > 0
    );
    
    // Find top gainer (highest positive change)
    let topGainer = null;
    let maxGain = -Infinity;
    
    // Find top loser (most negative change)
    let topLoser = null;
    let maxLoss = Infinity;
    
    coins.forEach(coin => {
      const change = coin.price_change_percentage_24h;
      
      // Check for gainer
      if (change > 0 && change > maxGain) {
        maxGain = change;
        topGainer = coin;
      }
      
      // Check for loser
      if (change < 0 && change < maxLoss) {
        maxLoss = change;
        topLoser = coin;
      }
    });
    
    // If no gainer found (all coins are down), use the least negative
    if (!topGainer && coins.length > 0) {
      topGainer = coins.reduce((leastNegative, coin) => 
        coin.price_change_percentage_24h > leastNegative.price_change_percentage_24h ? coin : leastNegative
      );
    }
    
    // If no loser found (all coins are up), use the smallest positive
    if (!topLoser && coins.length > 0) {
      topLoser = coins.reduce((smallestPositive, coin) => 
        coin.price_change_percentage_24h < smallestPositive.price_change_percentage_24h ? coin : smallestPositive
      );
    }
    
    // Ensure we don't return the same coin for both
    if (topGainer && topLoser && topGainer.id === topLoser.id) {
      // If same, find the next different coin for loser
      const differentLoser = coins.find(coin => 
        coin.id !== topGainer.id && coin.price_change_percentage_24h < 0
      );
      if (differentLoser) {
        topLoser = differentLoser;
      } else {
        // If no different loser, use mock data
        topLoser = generateMockTopPerformer('loser');
      }
    }
    
    return {
      topGainer: topGainer ? processTopPerformer([topGainer], 'gainer') : generateMockTopPerformer('gainer'),
      topLoser: topLoser ? processTopPerformer([topLoser], 'loser') : generateMockTopPerformer('loser')
    };
    
  } catch (error) {
    console.warn('Error fetching market leaders, using mock:', error.message);
    return {
      topGainer: generateMockTopPerformer('gainer'),
      topLoser: generateMockTopPerformer('loser')
    };
  }
};

// Keep individual functions for backward compatibility
export const fetchTopGainer = async () => {
  const leaders = await fetchMarketLeaders();
  return leaders.topGainer;
};

export const fetchTopLoser = async () => {
  const leaders = await fetchMarketLeaders();
  return leaders.topLoser;
};

// Optional: Fetch trending coins
export const fetchTrendingCoins = async () => {
  try {
    const response = await apiClient.get('/search/trending');
    if (response.data && response.data.coins) {
      return response.data.coins.map(coin => ({
        id: coin.item.id,
        name: coin.item.name,
        symbol: coin.item.symbol,
        price: coin.item.price_btc,
        rank: coin.item.market_cap_rank
      }));
    }
    return [];
  } catch (error) {
    console.warn('Error fetching trending coins:', error.message);
    return [];
  }
};