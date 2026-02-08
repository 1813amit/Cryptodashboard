// src/components/Panel1/ChartContainer.jsx
import React, { useState, useEffect } from 'react';
import { useCrypto } from '../../context/CryptoContext';
import CryptoSelector from './CryptoSelector';
import TimeframeSelector from './TimeframeSelector';
import PriceChart from './PriceChart';
import VolumeChart from './VolumeChart';
import { 
  LineChart, BarChart3, Download, 
  Maximize2, Share2, Bookmark,
  ChevronUp, ChevronDown,
  TrendingUp, TrendingDown,
  Info
} from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

const ChartContainer = () => {
  const { cryptoData, selectedCrypto, loading, error } = useCrypto();
  const [chartType, setChartType] = useState('line');
  const [showVolumeChart, setShowVolumeChart] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Exit fullscreen on Escape key
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  if (loading && (!cryptoData || cryptoData.length === 0)) {
    return (
      <div className="card">
        <div className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Loading cryptocurrency data...</p>
        </div>
      </div>
    );
  }

  if (error && (!cryptoData || cryptoData.length === 0)) {
    return (
      <div className="card">
        <div className="p-8 text-center">
          <div className="text-red-500 mb-4">
            <TrendingDown className="inline-block w-12 h-12" />
          </div>
          <p className="text-gray-400 mb-2">Failed to load data</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!cryptoData || cryptoData.length === 0) {
    return (
      <div className="card">
        <div className="p-8 text-center">
          <p className="text-gray-400">No data available</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const latestData = cryptoData[cryptoData.length - 1];
  const firstData = cryptoData[0];
  const priceChange = latestData.price - firstData.price;
  const priceChangePercent = firstData.price !== 0 ? (priceChange / firstData.price) * 100 : 0;
  
  // Find 24h high and low
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayData = cryptoData.filter(item => new Date(item.timestamp) >= today);
  const dailyHigh = todayData.length > 0 ? Math.max(...todayData.map(d => d.price)) : latestData.price;
  const dailyLow = todayData.length > 0 ? Math.min(...todayData.map(d => d.price)) : latestData.price;
  
  // Calculate volume statistics
  const totalVolume = cryptoData.reduce((sum, item) => sum + item.volume, 0);
  const avgVolume = totalVolume / cryptoData.length;

  return (
    <div className={`card ${isFullscreen ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
      {/* Header with crypto info */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">
                  {selectedCrypto.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center flex-wrap gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold truncate">
                    {selectedCrypto.charAt(0).toUpperCase() + selectedCrypto.slice(1)}
                  </h2>
                  <span className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
                    ({selectedCrypto.toUpperCase()})
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    priceChange >= 0 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {formatPercentage(priceChangePercent)}
                  </span>
                </div>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
                  {formatCurrency(latestData.price)}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>24h High: <span className="font-medium text-green-600">{formatCurrency(dailyHigh)}</span></span>
                  <span>24h Low: <span className="font-medium text-red-600">{formatCurrency(dailyLow)}</span></span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button className="btn-primary flex items-center gap-2 px-4 py-2 text-sm">
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">Add to Watchlist</span>
              <span className="sm:hidden">Watchlist</span>
            </button>
            <button className="btn-outline flex items-center gap-2 px-4 py-2 text-sm">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chart controls */}
      <div className="p-3 sm:p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
  <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center justify-between gap-3">
    {/* Left controls - Timeframe and crypto selector */}
    <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
      <div className="w-full xs:w-auto">
        <CryptoSelector />
      </div>
      <div className="w-full xs:w-auto">
        <TimeframeSelector />
      </div>
    </div>
    
    {/* Right controls - Chart type and actions */}
    <div className="flex items-center justify-between sm:justify-end gap-1 sm:gap-2 w-full sm:w-auto">
      {/* Chart type toggle - Stack on very small screens */}
      <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
        <button
          onClick={() => setChartType('line')}
          className={`flex items-center justify-center sm:justify-start gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm min-w-[60px] sm:min-w-0 ${
            chartType === 'line'
              ? 'bg-gray-200 dark:bg-gray-700'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          title="Line Chart"
        >
          <LineChart className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">Line</span>
        </button>
        <button
          onClick={() => setChartType('candlestick')}
          className={`flex items-center justify-center sm:justify-start gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm min-w-[60px] sm:min-w-0 border-l border-gray-300 dark:border-gray-600 ${
            chartType === 'candlestick'
              ? 'bg-gray-200 dark:bg-gray-700'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          title="Candlestick Chart"
        >
          <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">Candle</span>
        </button>
      </div>
      
    </div>
  </div>
  
  {/* Volume label for mobile - Shows below controls */}
  <div className="mt-2 sm:hidden flex items-center justify-center">
    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
      <div className={`w-2 h-2 rounded-full ${showVolumeChart ? 'bg-green-500' : 'bg-gray-500'}`}></div>
      <span>Volume: {showVolumeChart ? 'Visible' : 'Hidden'}</span>
    </div>
  </div>
</div>

      {/* Main chart area */}
      <div className="p-4 sm:p-6">
        {/* Price Chart */}
        <div className="mb-6">
          <div className="h-64 sm:h-72 md:h-80 lg:h-96">
            <PriceChart 
              data={cryptoData} 
              chartType={chartType}
              showGrid={true}
              showLegend={true}
            />
          </div>
          <div className="mt-4 flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-blue-500"></div>
                <span className="text-gray-600 dark:text-gray-400">Price</span>
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {formatCurrency(latestData.price)}
              </div>
            </div>
            <div className={`font-medium ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {priceChange >= 0 ? '↗' : '↘'} {formatPercentage(priceChangePercent)}
            </div>
          </div>
        </div>

        {/* Volume Chart */}
        {showVolumeChart && (
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Volume (24h)</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg: {formatCurrency(avgVolume)}
              </div>
            </div>
            <div className="h-32 sm:h-40 md:h-48">
              <VolumeChart data={cryptoData} />
            </div>
            <div className="mt-4 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
              <span>Total Volume: {formatCurrency(totalVolume)}</span>
              <span>Latest: {formatCurrency(latestData.volume)}</span>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Market Cap</div>
            <div className="text-sm font-semibold">$1.34T</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Circulating Supply</div>
            <div className="text-sm font-semibold">19.6M {selectedCrypto.toUpperCase()}</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Volume</div>
            <div className="text-sm font-semibold">{formatCurrency(totalVolume)}</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Change (7D)</div>
            <div className={`text-sm font-semibold ${priceChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercentage(priceChangePercent)}
            </div>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Info className="w-4 h-4" />
            <span>Data provided by CoinGecko API</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Updated: {new Date().toLocaleTimeString()}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Timeframe: 7 days</span>
          </div>
        </div>
      </div>

      {/* Fullscreen close button */}
      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="fixed top-4 right-4 bg-gray-800 text-white p-2 rounded-lg z-50 hover:bg-gray-700"
        >
          Exit Fullscreen
        </button>
      )}
    </div>
  );
};

// ✅ Make sure this line is at the end
export default ChartContainer;