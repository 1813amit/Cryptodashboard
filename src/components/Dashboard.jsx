// src/components/Dashboard.jsx
import React from 'react';
import { useCrypto } from '../context/CryptoContext';
import Panel1 from './Panel1/ChartContainer';
import Panel2 from './Panel2/TopPerformers';
import LoadingSpinner from './shared/LoadingSpinner';
import ErrorDisplay from './shared/ErrorDisplay';
import MarketOverview from './MarketOverview';
import MobileGainersLosers from './Panel2/MobileGainersLosers';

const Dashboard = () => {
  const { loading, error, usingMockData } = useCrypto();

  if (loading && !error) return <LoadingSpinner />;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Market Overview */}
      <MarketOverview />
      
      {/* Demo mode banner */}
      {usingMockData && (
        <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
            <div className="flex-1">
              <p className="font-medium text-sm text-yellow-300">Using Demo Data</p>
              <p className="text-xs text-yellow-400/80">
                Showing sample data. Click refresh to load real-time data.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Gainers & Losers (Top of mobile view) */}
      <div className="lg:hidden">
        <MobileGainersLosers />
      </div>
      
      {/* Main Content */}
      {error && !usingMockData ? (
        <ErrorDisplay message={error} />
      ) : (
        <>
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            {/* Left Column - Chart */}
            <div className="lg:col-span-2">
              <Panel1 />
            </div>
            
            {/* Right Column - Top Performers & Stats */}
            <div className="space-y-6">
              <Panel2 />
            </div>
          </div>
          
          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-6">
            <Panel1 />
            
            {/* Additional Mobile Stats */}
            <div className="card p-4">
              <h3 className="font-semibold text-lg mb-4">Market Insights</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-800/30 rounded-lg">
                  <div className="text-xs text-blue-400 mb-1">24h High</div>
                  <div className="text-lg font-bold text-white">$70,546</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-red-900/20 to-red-900/10 border border-red-800/30 rounded-lg">
                  <div className="text-xs text-red-400 mb-1">24h Low</div>
                  <div className="text-lg font-bold text-white">$60,255</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-green-900/20 to-green-900/10 border border-green-800/30 rounded-lg">
                  <div className="text-xs text-green-400 mb-1">24h Volume</div>
                  <div className="text-lg font-bold text-white">$162.8B</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-purple-900/20 to-purple-900/10 border border-purple-800/30 rounded-lg">
                  <div className="text-xs text-purple-400 mb-1">Market Rank</div>
                  <div className="text-lg font-bold text-white">#1</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;