// src/components/Panel2/TopLoserCard.jsx
import React from 'react';
import { TrendingDown, ArrowUpRight } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

const TopLoserCard = ({ data }) => {
  const changePercent = data.price_change_percentage_24h || 0;
  
  return (
    <div className="bg-gradient-to-br from-red-900/20 to-red-900/5 border border-red-800/30 rounded-xl p-3 sm:p-4 md:p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-red-900/30 flex items-center justify-center">
            <span className="font-bold text-base sm:text-lg md:text-xl">
              {data.symbol?.charAt(0) || '?'}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-base sm:text-lg md:text-xl truncate">
              {data.name}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm truncate">
              {data.symbol?.toUpperCase()}
            </p>
          </div>
        </div>
        
       
      </div>
      
      {/* Price Info */}
      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-xs sm:text-sm">Current Price</span>
          <span className="font-bold text-base sm:text-lg md:text-xl">
            {formatCurrency(data.current_price)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-xs sm:text-sm">24h High</span>
          <span className="text-gray-300 text-xs sm:text-sm">
            {formatCurrency(data.high_24h)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-xs sm:text-sm">24h Low</span>
          <span className="text-gray-300 text-xs sm:text-sm">
            {formatCurrency(data.low_24h)}
          </span>
        </div>
      </div>
      
      {/* Button */}
      <button className="w-full mt-3 sm:mt-4 flex items-center justify-center gap-2 py-1.5 sm:py-2 bg-red-900/30 hover:bg-red-900/40 text-crypto-red rounded-lg transition-colors text-xs sm:text-sm">
        <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
        View Details
      </button>
    </div>
  );
};

export default TopLoserCard;