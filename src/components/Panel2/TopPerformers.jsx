// src/components/Panel2/TopPerformers.jsx - Enhanced desktop version
import React from 'react';
import { useCrypto } from '../../context/CryptoContext';
import TopGainerCard from './TopGainerCard';
import TopLoserCard from './TopLoserCard';
import { 
  TrendingUp, TrendingDown, Filter, 
  ChevronRight, Trophy, Flame,
  BarChart3, Activity, TrendingUp as TrendIcon
} from 'lucide-react';

const TopPerformers = () => {
  const { topGainer, topLoser } = useCrypto();

  const trendingCoins = [
    { name: 'Bitcoin', symbol: 'BTC', price: '$68,367', change: '+2.4%', cap: '$1.34T', volume: '$66.7B' },
    { name: 'Ethereum', symbol: 'ETH', price: '$3,935', change: '+1.2%', cap: '$473B', volume: '$23.5B' },
    { name: 'Solana', symbol: 'SOL', price: '$168', change: '+8.5%', cap: '$74B', volume: '$8.9B' },
    { name: 'Cardano', symbol: 'ADA', price: '$0.62', change: '+1.8%', cap: '$22B', volume: '$1.2B' },
  ];

  const marketIndicators = [
    { label: 'BTC Dominance', value: '52.4%', change: '+0.8%', icon: <Activity className="w-4 h-4" /> },
    { label: 'Fear & Greed', value: '76', level: 'Extreme Greed', icon: <TrendIcon className="w-4 h-4" /> },
    { label: '24h Volume', value: '$86.5B', change: '+15.2%', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <div>
            <h2 className="text-xl font-bold">Market Leaders</h2>
            <p className="text-sm text-gray-500">Real-time top performers</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400">Live</span>
        </div>
      </div>

      {/* Gainers & Losers Cards */}
      <div className="grid grid-cols-1 gap-4">
        {/* Top Gainer Card */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-900/20 to-emerald-900/10 border border-green-800/30 p-5">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full -translate-y-12 translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-semibold text-green-300">TOP GAINER</span>
                  </div>
                  <h3 className="text-xl font-bold">Highest 24h Gain</h3>
                </div>
              </div>
            </div>
            
            {topGainer && <TopGainerCard data={topGainer} />}
          </div>
        </div>

        {/* Top Loser Card */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-900/20 to-rose-900/10 border border-red-800/30 p-5">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full -translate-y-12 translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-sm font-semibold text-red-300">TOP LOSER</span>
                  </div>
                  <h3 className="text-xl font-bold">Highest 24h Loss</h3>
                </div>
              </div>
            </div>
            
            {topLoser && <TopLoserCard data={topLoser} />}
          </div>
        </div>
      </div>

      {/* Market Indicators */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Market Indicators</h3>
          <Flame className="w-5 h-5 text-orange-500" />
        </div>
        
        <div className="space-y-3">
          {marketIndicators.map((indicator, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                  {indicator.icon}
                </div>
                <div>
                  <div className="font-medium">{indicator.label}</div>
                  {indicator.level && (
                    <div className="text-sm text-gray-500">{indicator.level}</div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">{indicator.value}</div>
                {indicator.change && (
                  <div className={`text-sm ${indicator.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {indicator.change}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Coins */}

     
    </div>
  );
};

export default TopPerformers;