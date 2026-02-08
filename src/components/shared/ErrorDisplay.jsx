// src/components/shared/ErrorDisplay.jsx
import React from 'react';
import { AlertTriangle, RefreshCw, WifiOff, Server } from 'lucide-react';
import { useCrypto } from '../../context/CryptoContext';

const ErrorDisplay = ({ message }) => {
  const { retryFetch, usingMockData } = useCrypto();

  const getErrorIcon = () => {
    if (message?.includes('Network') || message?.includes('connection')) {
      return <WifiOff className="w-8 h-8 text-yellow-500" />;
    }
    if (message?.includes('API') || message?.includes('rate limit')) {
      return <Server className="w-8 h-8 text-orange-500" />;
    }
    return <AlertTriangle className="w-8 h-8 text-red-500" />;
  };

  const getErrorTitle = () => {
    if (usingMockData) {
      return "Using Demo Data";
    }
    if (message?.includes('Network') || message?.includes('connection')) {
      return "Connection Error";
    }
    if (message?.includes('rate limit')) {
      return "API Rate Limit";
    }
    return "Unable to Load Data";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="bg-crypto-card border border-gray-800 rounded-xl p-8 max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
            {getErrorIcon()}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-center mb-2">
          {getErrorTitle()}
        </h3>
        
        <p className="text-gray-400 text-center mb-6">
          {usingMockData 
            ? "Showing demo data. Real-time updates will resume when connection is restored."
            : message || 'There was an error fetching cryptocurrency data.'}
        </p>
        
        {usingMockData ? (
          <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-green-400 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="font-medium">Demo Mode Active</span>
            </div>
            <p className="text-sm text-green-300">
              You're viewing sample cryptocurrency data. The dashboard will automatically 
              reconnect to real-time data when available.
            </p>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-400 mb-2">Troubleshooting tips:</p>
            <ul className="text-sm text-gray-300 space-y-1">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                Check your internet connection
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                CoinGecko API might be busy (free tier limits)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                Try refreshing in a few moments
              </li>
            </ul>
          </div>
        )}
        
        <div className="flex gap-3">
          <button
            onClick={retryFetch}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-crypto-blue hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            {usingMockData ? "Reconnect" : "Try Again"}
          </button>
          
          {usingMockData && (
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
            >
              Refresh Page
            </button>
          )}
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-6">
          Data provided by CoinGecko API • Free tier has rate limits
        </p>
      </div>
    </div>
  );
};

export default ErrorDisplay;