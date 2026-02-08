// src/utils/chartDataProcessor.js

/**
 * Process raw CoinGecko API data into chart-ready format
 * @param {Object} rawData - Raw API response from /coins/{id}/market_chart
 * @param {string} timeframe - Selected timeframe ('7', '14', '30', etc.)
 * @returns {Array} Processed chart data
 */
export const processChartData = (rawData, timeframe = '7') => {
  if (!rawData || !rawData.prices || !rawData.total_volumes) {
    console.warn('Invalid or empty data received');
    return generateMockData(timeframe);
  }

  const prices = rawData.prices || [];
  const volumes = rawData.total_volumes || [];
  
  // Determine sampling interval based on timeframe
  const sampleInterval = calculateSampleInterval(prices.length, parseInt(timeframe));
  
  const processedData = [];
  
  for (let i = 0; i < prices.length; i += sampleInterval) {
    const pricePoint = prices[i];
    const volumePoint = volumes[i] || [pricePoint[0], 0];
    
    if (!pricePoint || !volumePoint) continue;
    
    const timestamp = pricePoint[0];
    const price = pricePoint[1];
    const volume = volumePoint[1];
    
    processedData.push({
      timestamp,
      date: formatDate(timestamp, timeframe),
      time: formatTime(timestamp),
      price: roundToDecimals(price, 2),
      volume: roundToDecimals(volume, 2),
      // Additional calculated metrics
      high: calculateHigh(prices, i, sampleInterval),
      low: calculateLow(prices, i, sampleInterval),
      open: prices[i - sampleInterval >= 0] ? prices[i - sampleInterval][1] : price,
      close: price
    });
  }
  
  // Add percentage change for each data point
  return addPercentageChanges(processedData);
};

/**
 * Generate candlestick data from price points
 * @param {Array} prices - Array of [timestamp, price] arrays
 * @param {number} interval - Candlestick interval in minutes
 * @returns {Array} Candlestick data
 */
export const generateCandlestickData = (prices, interval = 60) => {
  if (!prices || prices.length === 0) {
    return generateMockCandlestickData();
  }
  
  const candlesticks = [];
  let currentCandle = null;
  
  prices.forEach(([timestamp, price]) => {
    const candleTime = Math.floor(timestamp / (interval * 60000)) * (interval * 60000);
    
    if (!currentCandle || currentCandle.timestamp !== candleTime) {
      if (currentCandle) {
        candlesticks.push(currentCandle);
      }
      
      currentCandle = {
        timestamp: candleTime,
        date: formatDate(candleTime),
        time: formatTime(candleTime),
        open: price,
        high: price,
        low: price,
        close: price,
        volume: 0
      };
    } else {
      currentCandle.high = Math.max(currentCandle.high, price);
      currentCandle.low = Math.min(currentCandle.low, price);
      currentCandle.close = price;
    }
  });
  
  if (currentCandle) {
    candlesticks.push(currentCandle);
  }
  
  return candlesticks;
};

/**
 * Process top gainers/losers data
 * @param {Array} marketData - Array of coin data from /coins/markets
 * @param {string} type - 'gainer' or 'loser'
 * @returns {Object} Processed top performer data
 */
export const processTopPerformer = (marketData, type = 'gainer') => {
  if (!marketData || marketData.length === 0) {
    return generateMockTopPerformer(type);
  }
  
  const coin = marketData[0];
  
  return {
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    current_price: coin.current_price,
    price_change_percentage_24h: coin.price_change_percentage_24h || 0,
    high_24h: coin.high_24h || coin.current_price,
    low_24h: coin.low_24h || coin.current_price,
    market_cap: coin.market_cap,
    total_volume: coin.total_volume,
    image: coin.image,
    last_updated: coin.last_updated,
    sparkline_in_7d: coin.sparkline_in_7d,
    // Additional calculated metrics
    price_change: coin.price_change_24h || 0,
    market_cap_rank: coin.market_cap_rank,
    ath: coin.ath,
    ath_change_percentage: coin.ath_change_percentage,
    atl: coin.atl,
    atl_change_percentage: coin.atl_change_percentage
  };
};

/**
 * Calculate statistics from chart data
 * @param {Array} data - Processed chart data
 * @returns {Object} Statistics object
 */
export const calculateStatistics = (data) => {
  if (!data || data.length === 0) {
    return {
      current: 0,
      high: 0,
      low: 0,
      average: 0,
      change: 0,
      changePercent: 0,
      volume: 0
    };
  }
  
  const prices = data.map(d => d.price);
  const volumes = data.map(d => d.volume);
  
  const current = prices[prices.length - 1];
  const high = Math.max(...prices);
  const low = Math.min(...prices);
  const average = prices.reduce((a, b) => a + b, 0) / prices.length;
  const change = current - prices[0];
  const changePercent = prices[0] !== 0 ? (change / prices[0]) * 100 : 0;
  const volume = volumes.reduce((a, b) => a + b, 0);
  
  return {
    current: roundToDecimals(current, 2),
    high: roundToDecimals(high, 2),
    low: roundToDecimals(low, 2),
    average: roundToDecimals(average, 2),
    change: roundToDecimals(change, 2),
    changePercent: roundToDecimals(changePercent, 2),
    volume: roundToDecimals(volume, 2),
    startPrice: roundToDecimals(prices[0], 2),
    endPrice: roundToDecimals(current, 2)
  };
};

/**
 * Filter data by timeframe
 * @param {Array} data - Full dataset
 * @param {string} timeframe - '24H', '7D', '1M', '3M', '1Y', 'ALL'
 * @returns {Array} Filtered data
 */
export const filterDataByTimeframe = (data, timeframe) => {
  if (!data || data.length === 0) return data;
  
  const now = Date.now();
  let cutoffTime;
  
  switch (timeframe) {
    case '24H':
      cutoffTime = now - (24 * 60 * 60 * 1000);
      break;
    case '7D':
      cutoffTime = now - (7 * 24 * 60 * 60 * 1000);
      break;
    case '1M':
      cutoffTime = now - (30 * 24 * 60 * 60 * 1000);
      break;
    case '3M':
      cutoffTime = now - (90 * 24 * 60 * 60 * 1000);
      break;
    case '1Y':
      cutoffTime = now - (365 * 24 * 60 * 60 * 1000);
      break;
    case 'ALL':
    default:
      return data;
  }
  
  return data.filter(item => item.timestamp >= cutoffTime);
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Calculate optimal sample interval for data points
 */
const calculateSampleInterval = (dataLength, days) => {
  const maxPoints = 100; // Maximum points to show on chart
  const minPoints = 20;  // Minimum points to show
  
  if (dataLength <= maxPoints) return 1;
  
  const idealInterval = Math.ceil(dataLength / maxPoints);
  return Math.max(idealInterval, Math.ceil(dataLength / (days * 24))); // At least 1 per hour
};

/**
 * Format date based on timeframe
 */
const formatDate = (timestamp, timeframe = '7') => {
  const date = new Date(timestamp);
  const days = parseInt(timeframe);
  
  if (days <= 1) {
    // For 24h or less, show hour:minute
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (days <= 7) {
    // For 7 days or less, show day name + time
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  } else if (days <= 30) {
    // For 30 days or less, show month/day
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  } else {
    // For longer periods, show month/year
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  }
};

/**
 * Format time
 */
const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

/**
 * Calculate high price for interval
 */
const calculateHigh = (prices, startIndex, interval) => {
  const endIndex = Math.min(startIndex + interval, prices.length);
  let high = prices[startIndex][1];
  
  for (let i = startIndex + 1; i < endIndex; i++) {
    if (prices[i][1] > high) {
      high = prices[i][1];
    }
  }
  
  return roundToDecimals(high, 2);
};

/**
 * Calculate low price for interval
 */
const calculateLow = (prices, startIndex, interval) => {
  const endIndex = Math.min(startIndex + interval, prices.length);
  let low = prices[startIndex][1];
  
  for (let i = startIndex + 1; i < endIndex; i++) {
    if (prices[i][1] < low) {
      low = prices[i][1];
    }
  }
  
  return roundToDecimals(low, 2);
};

/**
 * Add percentage changes to data points
 */
const addPercentageChanges = (data) => {
  if (data.length === 0) return data;
  
  const firstPrice = data[0].price;
  
  return data.map((point, index) => ({
    ...point,
    change: roundToDecimals(point.price - firstPrice, 2),
    changePercent: firstPrice !== 0 
      ? roundToDecimals(((point.price - firstPrice) / firstPrice) * 100, 2)
      : 0,
    dailyChange: index > 0 
      ? roundToDecimals(point.price - data[index - 1].price, 2)
      : 0,
    dailyChangePercent: index > 0 && data[index - 1].price !== 0
      ? roundToDecimals(((point.price - data[index - 1].price) / data[index - 1].price) * 100, 2)
      : 0
  }));
};

/**
 * Round number to specified decimals
 */
const roundToDecimals = (num, decimals = 2) => {
  if (num === null || num === undefined) return 0;
  const multiplier = Math.pow(10, decimals);
  return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
};

// ============================================
// MOCK DATA GENERATORS (for fallback)
// ============================================

/**
 * Generate mock chart data
 */
export const generateMockData = (timeframe = '7') => {
  const days = parseInt(timeframe) || 7;
  const dataPoints = Math.min(days * 24, 100); // Max 100 points
  const basePrice = 40000;
  const baseVolume = 25000000000;
  
  const data = [];
  const now = Date.now();
  const interval = (days * 24 * 60 * 60 * 1000) / dataPoints;
  
  let currentPrice = basePrice;
  
  for (let i = 0; i < dataPoints; i++) {
    const timestamp = now - (dataPoints - i - 1) * interval;
    
    // Simulate price movement
    const change = (Math.random() - 0.5) * 2000;
    currentPrice = Math.max(30000, Math.min(70000, currentPrice + change));
    
    // Simulate volume (higher when price changes more)
    const volume = baseVolume * (0.8 + Math.random() * 0.4);
    
    data.push({
      timestamp,
      date: formatDate(timestamp, timeframe),
      time: formatTime(timestamp),
      price: roundToDecimals(currentPrice, 2),
      volume: roundToDecimals(volume, 2),
      high: roundToDecimals(currentPrice * (1 + Math.random() * 0.02), 2),
      low: roundToDecimals(currentPrice * (1 - Math.random() * 0.02), 2),
      open: roundToDecimals(currentPrice * (1 + (Math.random() - 0.5) * 0.01), 2),
      close: roundToDecimals(currentPrice, 2)
    });
  }
  
  return addPercentageChanges(data);
};

/**
 * Generate mock candlestick data
 */
export const generateMockCandlestickData = () => {
  const data = [];
  const now = Date.now();
  const interval = 60 * 60 * 1000; // 1 hour intervals
  const basePrice = 40000;
  
  let currentPrice = basePrice;
  
  for (let i = 0; i < 24 * 7; i++) { // 7 days of hourly data
    const timestamp = now - (24 * 7 - i - 1) * interval;
    
    // Simulate price movement for candle
    const open = currentPrice;
    const change = (Math.random() - 0.5) * 500;
    currentPrice = Math.max(35000, Math.min(45000, currentPrice + change));
    const close = currentPrice;
    
    // High and low within range
    const range = Math.abs(close - open) * 2;
    const high = Math.max(open, close) + Math.random() * range * 0.5;
    const low = Math.min(open, close) - Math.random() * range * 0.5;
    
    data.push({
      timestamp,
      date: formatDate(timestamp, '7'),
      time: formatTime(timestamp),
      open: roundToDecimals(open, 2),
      high: roundToDecimals(high, 2),
      low: roundToDecimals(low, 2),
      close: roundToDecimals(close, 2),
      volume: roundToDecimals(1000000000 * (0.5 + Math.random()), 2)
    });
  }
  
  return data;
};

/**
 * Generate mock top performer data
 */
export const generateMockTopPerformer = (type) => {
  const isGainer = type === 'gainer';
  
  return {
    id: isGainer ? 'ethereum' : 'dogecoin',
    name: isGainer ? 'Ethereum' : 'Dogecoin',
    symbol: isGainer ? 'ETH' : 'DOGE',
    current_price: isGainer ? 3500 : 0.15,
    price_change_percentage_24h: isGainer ? 8.5 : -4.2,
    high_24h: isGainer ? 3600 : 0.16,
    low_24h: isGainer ? 3400 : 0.14,
    market_cap: isGainer ? 420000000000 : 21000000000,
    total_volume: isGainer ? 15000000000 : 800000000,
    image: '',
    last_updated: new Date().toISOString(),
    price_change: isGainer ? 275 : -0.006,
    market_cap_rank: isGainer ? 2 : 10,
    ath: isGainer ? 4800 : 0.74,
    ath_change_percentage: isGainer ? -27.08 : -79.73,
    atl: isGainer ? 0.432 : 0.0000869,
    atl_change_percentage: isGainer ? 810000 : 172000
  };
};

// Also export the helper functions that might be needed
export {
  calculateSampleInterval,
  formatDate,
  formatTime,
  calculateHigh,
  calculateLow,
  addPercentageChanges,
  roundToDecimals
};

// Export all functions at the bottom for clarity
export default {
  processChartData,
  generateCandlestickData,
  processTopPerformer,
  calculateStatistics,
  filterDataByTimeframe,
  generateMockData,
  generateMockCandlestickData,
  generateMockTopPerformer
};