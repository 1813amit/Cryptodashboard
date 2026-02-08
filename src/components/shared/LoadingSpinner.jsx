// src/components/shared/LoadingSpinner.jsx
import React from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { useCrypto } from '../../context/CryptoContext';

const LoadingSpinner = () => {
  const { retryFetch } = useCrypto();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="relative mb-6">
        <div className="w-16 h-16 border-4 border-gray-800 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-crypto-blue rounded-full border-t-transparent animate-spin"></div>
        <Loader2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-crypto-blue animate-pulse" />
      </div>
      
      <p className="text-gray-400 mb-2">Loading cryptocurrency data...</p>
      <p className="text-sm text-gray-500 mb-6">Fetching from CoinGecko API</p>
      
      <div className="bg-gray-800 rounded-lg p-4 mb-6 max-w-sm">
        <p className="text-sm text-gray-400 mb-2">If this takes too long:</p>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• CoinGecko API might be busy</li>
          <li>• Check your internet connection</li>
          <li>• Try refreshing in a moment</li>
        </ul>
      </div>
      
      <button
        onClick={retryFetch}
        className="flex items-center gap-2 px-6 py-3 bg-crypto-blue hover:bg-blue-600 text-white rounded-lg transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Try Loading Again
      </button>
      
      <p className="text-xs text-gray-500 mt-4">
        Using demo data as fallback...
      </p>
    </div>
  );
};

export default LoadingSpinner;