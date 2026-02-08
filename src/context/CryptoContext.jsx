// src/context/CryptoContext.jsx
import React, { createContext, useReducer, useContext, useEffect, useState } from 'react';
import { fetchHistoricalData, fetchTopGainer, fetchTopLoser } from '../services/coinGeckoAPI';

// Add initial mock data to prevent empty state
const initialMockData = Array.from({ length: 7 }, (_, i) => ({
  timestamp: Date.now() - (7 - i) * 86400000,
  date: new Date(Date.now() - (7 - i) * 86400000).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  }),
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  price: 42000 + Math.random() * 5000 - 2500,
  volume: 25000000000 + Math.random() * 10000000000
}));

const initialMockGainer = {
  id: 'ethereum',
  name: 'Ethereum',
  symbol: 'ETH',
  current_price: 2935.66,
  price_change_percentage_24h: 5.2,
  high_24h: 3000.00,
  low_24h: 2800.00,
};

const initialMockLoser = {
  id: 'dogecoin',
  name: 'Dogecoin',
  symbol: 'DOGE',
  current_price: 0.12,
  price_change_percentage_24h: -3.8,
  high_24h: 0.13,
  low_24h: 0.11,
};

const initialState = {
  selectedCrypto: 'bitcoin',
  timeframe: '7',
  cryptoData: initialMockData, // Start with mock data
  topGainer: initialMockGainer,
  topLoser: initialMockLoser,
  loading: false, // Start with false since we have mock data
  error: null,
  lastUpdated: new Date(),
  usingMockData: true, // Start with mock data
  isInitialLoad: true,
};

const CryptoContext = createContext();

const cryptoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SELECTED_CRYPTO':
      return { ...state, selectedCrypto: action.payload };
    case 'SET_TIMEFRAME':
      return { ...state, timeframe: action.payload };
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        cryptoData: action.payload.data,
        topGainer: action.payload.topGainer,
        topLoser: action.payload.topLoser,
        lastUpdated: new Date(),
        usingMockData: action.payload.usingMockData || false,
        isInitialLoad: false,
        error: null
      };
    case 'FETCH_ERROR':
      return { 
        ...state, 
        loading: false, 
        error: action.payload,
        usingMockData: true,
        isInitialLoad: false
      };
    case 'USE_MOCK_DATA':
      return {
        ...state,
        loading: false,
        cryptoData: action.payload.data,
        topGainer: action.payload.topGainer,
        topLoser: action.payload.topLoser,
        lastUpdated: new Date(),
        usingMockData: true,
        isInitialLoad: false,
        error: null
      };
    default:
      return state;
  }
};

export const CryptoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cryptoReducer, initialState);
  const [retryCount, setRetryCount] = useState(0);

  const fetchAllData = async (force = false, isRetry = false) => {
    // Don't start loading on initial render if we already have mock data
    if (!isRetry && !force) {
      dispatch({ type: 'FETCH_START' });
    }
    
    try {
      const [historicalData, gainer, loser] = await Promise.all([
        fetchHistoricalData(state.selectedCrypto, state.timeframe),
        fetchTopGainer(),
        fetchTopLoser()
      ]);

      // Check if we're using mock data
      const usingMockData = historicalData.some(item => 
        item.price === undefined || item.volume === undefined
      );

      dispatch({ 
        type: 'FETCH_SUCCESS', 
        payload: {
          data: historicalData,
          topGainer: gainer,
          topLoser: loser,
          usingMockData
        }
      });
      setRetryCount(0); // Reset retry count on success
      
    } catch (error) {
      console.error('Error fetching data:', error);
      
      // If we've retried less than 2 times, try again
      if (retryCount < 2) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => fetchAllData(false, true), 1500); // Retry after 1.5 seconds
      } else {
        // After retries, use mock data
        const mockHistoricalData = Array.from({ length: 7 }, (_, i) => ({
          timestamp: Date.now() - (7 - i) * 86400000,
          date: new Date(Date.now() - (7 - i) * 86400000).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          }),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          price: 42000 + Math.random() * 5000 - 2500,
          volume: 25000000000 + Math.random() * 10000000000
        }));
        
        const mockGainer = {
          id: 'ethereum',
          name: 'Ethereum',
          symbol: 'ETH',
          current_price: 2935.66,
          price_change_percentage_24h: 5.2,
          high_24h: 3000.00,
          low_24h: 2800.00,
        };
        
        const mockLoser = {
          id: 'dogecoin',
          name: 'Dogecoin',
          symbol: 'DOGE',
          current_price: 0.12,
          price_change_percentage_24h: -3.8,
          high_24h: 0.13,
          low_24h: 0.11,
        };
        
        dispatch({ 
          type: 'USE_MOCK_DATA', 
          payload: {
            data: mockHistoricalData,
            topGainer: mockGainer,
            topLoser: mockLoser
          }
        });
      }
    }
  };

  // Initial fetch - try to get real data
  useEffect(() => {
    // Small delay to let the page load first
    const timer = setTimeout(() => {
      fetchAllData();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [state.selectedCrypto, state.timeframe]);

  // Set up auto-refresh every 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAllData();
    }, 120000);
    
    return () => clearInterval(interval);
  }, []);

  const setSelectedCrypto = (cryptoId) => {
    dispatch({ type: 'SET_SELECTED_CRYPTO', payload: cryptoId });
  };

  const setTimeframe = (days) => {
    dispatch({ type: 'SET_TIMEFRAME', payload: days });
  };

  const retryFetch = () => {
    setRetryCount(0);
    fetchAllData(true);
  };

  return (
    <CryptoContext.Provider value={{ 
      ...state, 
      setSelectedCrypto, 
      setTimeframe, 
      fetchAllData: () => fetchAllData(true),
      retryFetch 
    }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);