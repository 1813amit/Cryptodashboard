// src/components/Panel2/MobileGainersLosers.jsx
import React from 'react';
import { useCrypto } from '../../context/CryptoContext';
import { 
  TrendingUp, TrendingDown, 
  ArrowUpRight, ArrowDownRight,
  Trophy, Award, Zap, Flame,
  ChevronRight
} from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

const MobileGainersLosers = () => {
  const { topGainer, topLoser } = useCrypto();

  // Fallback data if API fails
  const fallbackGainer = {
    name: 'Solana',
    symbol: 'SOL',
    current_price: 168.42,
    price_change_percentage_24h: 24.5,
    high_24h: 172.15,
    low_24h: 142.30,
  };

  const fallbackLoser = {
    name: 'Dogecoin',
    symbol: 'DOGE',
    current_price: 0.128,
    price_change_percentage_24h: -12.3,
    high_24h: 0.145,
    low_24h: 0.125,
  };

  const gainer = topGainer || fallbackGainer;
  const loser = topLoser || fallbackLoser;

  const trendingCoins = [
    { symbol: 'BTC', name: 'Bitcoin', price: 68367.67, change: 2.4, volume: '66.7B' },
    { symbol: 'ETH', name: 'Ethereum', price: 3935.66, change: 1.2, volume: '23.5B' },
    { symbol: 'BNB', name: 'BNB', price: 638.67, change: -0.5, volume: '3.4B' },
    { symbol: 'XRP', name: 'Ripple', price: 0.62, change: 0.8, volume: '2.1B' },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h2 className="text-lg font-bold">Top Movers</h2>
        </div>
        <button className="text-sm text-blue-400 flex items-center gap-1">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Gainers & Losers Cards - Eye-catching design */}
      <div className="grid grid-cols-2 gap-3">
        {/* Top Gainer Card */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-900/30 to-emerald-900/20 border border-green-800/40 p-4">
          {/* Animated background effect */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -translate-y-10 translate-x-10"></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs font-medium text-green-300">TOP GAINER</span>
                  </div>
                  <h3 className="font-bold text-lg text-white">{gainer.symbol}</h3>
                </div>
              </div>
              <div className="bg-green-900/50 backdrop-blur-sm px-3 py-1 rounded-full border border-green-700/50">
                <span className="font-bold text-green-300 text-sm">
                  {formatPercentage(gainer.price_change_percentage_24h)}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <div className="text-xs text-green-400/80">Current Price</div>
                <div className="text-xl font-bold text-white">
                  {formatCurrency(gainer.current_price)}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs text-green-400/80">24h High</div>
                  <div className="text-sm text-white">
                    {formatCurrency(gainer.high_24h)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-green-400/80">24h Low</div>
                  <div className="text-sm text-white">
                    {formatCurrency(gainer.low_24h)}
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 bg-green-900/40 hover:bg-green-900/60 text-green-300 rounded-lg transition-colors text-sm border border-green-800/50">
              <ArrowUpRight className="w-4 h-4" />
              Trade {gainer.symbol}
            </button>
          </div>
          
          {/* Sparkle effect */}
          <div className="absolute top-2 left-2 w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-3 right-3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-300"></div>
        </div>

        {/* Top Loser Card */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-900/30 to-rose-900/20 border border-red-800/40 p-4">
          {/* Animated background effect */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full -translate-y-10 translate-x-10"></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg">
                  <TrendingDown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-xs font-medium text-red-300">TOP LOSER</span>
                  </div>
                  <h3 className="font-bold text-lg text-white">{loser.symbol}</h3>
                </div>
              </div>
              <div className="bg-red-900/50 backdrop-blur-sm px-3 py-1 rounded-full border border-red-700/50">
                <span className="font-bold text-red-300 text-sm">
                  {formatPercentage(loser.price_change_percentage_24h)}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <div className="text-xs text-red-400/80">Current Price</div>
                <div className="text-xl font-bold text-white">
                  {formatCurrency(loser.current_price)}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs text-red-400/80">24h High</div>
                  <div className="text-sm text-white">
                    {formatCurrency(loser.high_24h)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-red-400/80">24h Low</div>
                  <div className="text-sm text-white">
                    {formatCurrency(loser.low_24h)}
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 bg-red-900/40 hover:bg-red-900/60 text-red-300 rounded-lg transition-colors text-sm border border-red-800/50">
              <ArrowDownRight className="w-4 h-4" />
              Trade {loser.symbol}
            </button>
          </div>
          
          {/* Sparkle effect */}
          <div className="absolute top-2 left-2 w-1 h-1 bg-orange-400 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-3 right-3 w-1 h-1 bg-orange-400 rounded-full animate-pulse delay-700"></div>
        </div>
      </div>

      {/* Trending Coins Carousel */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold">Trending Now</h3>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">Live</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex gap-3 pb-2">
            {trendingCoins.map((coin, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-40 p-3 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors cursor-pointer bg-gray-800/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
                      <span className="font-bold text-sm">{coin.symbol.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{coin.symbol}</div>
                      <div className="text-xs text-gray-400">{coin.name}</div>
                    </div>
                  </div>
                  <div className={`text-sm font-bold ${coin.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {coin.change >= 0 ? '↗' : '↘'} {Math.abs(coin.change)}%
                  </div>
                </div>
                <div className="text-lg font-bold">{formatCurrency(coin.price)}</div>
                <div className="text-xs text-gray-400 mt-1">Vol: {coin.volume}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center p-2 bg-gradient-to-br from-blue-900/20 to-blue-900/10 rounded-lg">
          <div className="text-xs text-blue-400">BTC Dominance</div>
          <div className="text-sm font-bold">52.4%</div>
        </div>
        <div className="text-center p-2 bg-gradient-to-br from-green-900/20 to-green-900/10 rounded-lg">
          <div className="text-xs text-green-400">Fear & Greed</div>
          <div className="text-sm font-bold">76</div>
        </div>
        <div className="text-center p-2 bg-gradient-to-br from-purple-900/20 to-purple-900/10 rounded-lg">
          <div className="text-xs text-purple-400">Market Cap</div>
          <div className="text-sm font-bold">$2.4T</div>
        </div>
      </div>
    </div>
  );
};

export default MobileGainersLosers;