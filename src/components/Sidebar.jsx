// src/components/Sidebar.jsx
import React from 'react';
import { 
  Home, TrendingUp, BarChart3, DollarSign, 
  Wallet, Award, Filter,
  Bitcoin, Coins, CircleDollarSign,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
 
  const popularCoins = [
    { symbol: 'BTC', name: 'Bitcoin', price: '$68,367.67', change: '+2.4%', icon: <Bitcoin size={16} /> },
    { symbol: 'ETH', name: 'Ethereum', price: '$3,935.66', change: '+1.2%', icon: <Coins size={16} /> },
    { symbol: 'BNB', name: 'BNB', price: '$638.67', change: '-0.5%', icon: <Coins size={16} /> },
    { symbol: 'XRP', name: 'Ripple', price: '$0.62', change: '+0.8%', icon: <CircleDollarSign size={16} /> },
  ];

  const trendingCoins = [
    { symbol: 'BTC', name: 'Bitcoin', price: '$68,367', change: '+2.4%', volume: '$66.7B' },
    { symbol: 'ETH', name: 'Ethereum', price: '$3,935', change: '+1.2%', volume: '$23.5B' },
    { symbol: 'SOL', name: 'Solana', price: '$168', change: '+8.5%', volume: '$8.9B' },
    { symbol: 'ADA', name: 'Cardano', price: '$0.62', change: '+1.8%', volume: '$1.2B' },
  ];

  const categories = [
    'Layer 1 / Layer 2',
    'Metaverse',
    'DeFi',
    'NFT',
    'Gaming',
    'Meme',
    'AI',
    'Launchpool New'
  ];

  return (
    <aside className="space-y-6">
      {/* Navigation Menu */}
     

      {/* Popular Coins */}
      <div className="card p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Popular Coins</h2>
          <button className="text-sm text-primary hover:underline">View All</button>
        </div>
        <div className="space-y-3">
          {popularCoins.map((coin, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  {coin.icon}
                </div>
                <div>
                  <div className="font-medium">{coin.symbol}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{coin.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{coin.price}</div>
                <div className={`text-sm ${coin.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {coin.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}


      {/* Market Stats */}
      <div className="card p-4">
        <h2 className="font-semibold text-lg mb-4">Market Stats</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Total Market Cap</span>
            <span className="font-medium">$2.4T</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">24h Volume</span>
            <span className="font-medium">$86.5B</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">BTC Dominance</span>
            <span className="font-medium">52.4%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Fear & Greed</span>
            <span className="font-medium text-green-600">76 (Extreme Greed)</span>
          </div>
        </div>
      </div>

      {/* Trending Coins */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-lg">Trending Coins</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">By market cap</p>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Filter className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          {trendingCoins.map((coin, index) => (
            <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 hover:scale-[1.01] cursor-pointer border border-transparent hover:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="text-xl font-bold text-gray-500 dark:text-gray-400">
                  {index + 1}
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-900/30 to-purple-900/30 flex items-center justify-center">
                  <span className="font-bold text-lg">{coin.symbol.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-bold text-lg">{coin.symbol}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{coin.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">{coin.price}</div>
                <div className={`text-sm font-bold ${coin.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {coin.change}
                </div>
                <div className="text-xs text-gray-500">Vol: {coin.volume}</div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-6 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-900/20 to-purple-900/20 hover:from-blue-900/30 hover:to-purple-900/30 text-blue-400 rounded-lg transition-colors border border-blue-800/30">
          View All Market Data
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Ads/Notes Section */}
    
    </aside>
  );
};

export default Sidebar;