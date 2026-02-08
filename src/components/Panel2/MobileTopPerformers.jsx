// src/components/Panel2/MobileTopPerformers.jsx
import React from 'react';
import { useCrypto } from '../../context/CryptoContext';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

const MobileTopPerformers = () => {
  const { topGainer, topLoser } = useCrypto();

  const trendingCoins = [
    { symbol: 'BTC', name: 'Bitcoin', price: '$68,367', change: '+2.4%' },
    { symbol: 'ETH', name: 'Ethereum', price: '$3,935', change: '+1.2%' },
    { symbol: 'SOL', name: 'Solana', price: '$168', change: '+8.5%' },
    { symbol: 'ADA', name: 'Cardano', price: '$0.62', change: '+1.8%' },
  ];

  return (
    <div className="space-y-4">
      {/* Top Gainers & Losers */}
      <div className="grid grid-cols-2 gap-3">
        {/* Top Gainer */}
        <div className="card p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-crypto-green"></div>
              <span className="text-xs font-medium">Top Gainer</span>
            </div>
            <TrendingUp className="w-3 h-3 text-crypto-green" />
          </div>
          {topGainer && (
            <>
              <div className="text-lg font-bold">{topGainer.symbol}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{topGainer.name}</div>
              <div className="text-sm font-bold text-crypto-green">
                {formatPercentage(topGainer.price_change_percentage_24h || 0)}
              </div>
              <div className="text-xs">{formatCurrency(topGainer.current_price)}</div>
            </>
          )}
        </div>

        {/* Top Loser */}
        <div className="card p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-crypto-red"></div>
              <span className="text-xs font-medium">Top Loser</span>
            </div>
            <TrendingDown className="w-3 h-3 text-crypto-red" />
          </div>
          {topLoser && (
            <>
              <div className="text-lg font-bold">{topLoser.symbol}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{topLoser.name}</div>
              <div className="text-sm font-bold text-crypto-red">
                {formatPercentage(topLoser.price_change_percentage_24h || 0)}
              </div>
              <div className="text-xs">{formatCurrency(topLoser.current_price)}</div>
            </>
          )}
        </div>
      </div>

      {/* Trending Coins */}
      <div className="card p-4">
        <h3 className="font-semibold text-base mb-3">Trending Coins</h3>
        <div className="space-y-2">
          {trendingCoins.map((coin, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-500 dark:text-gray-400 w-4">{index + 1}</div>
                <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-xs font-bold">{coin.symbol.charAt(0)}</span>
                </div>
                <div>
                  <div className="text-sm font-medium">{coin.symbol}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{coin.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{coin.price}</div>
                <div className={`text-xs ${coin.change.startsWith('+') ? 'price-up' : 'price-down'}`}>
                  {coin.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileTopPerformers;