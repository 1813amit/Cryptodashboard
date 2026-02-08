// src/components/Panel1/TimeframeSelector.jsx - Mobile responsive
import React from 'react';
import { useCrypto } from '../../context/CryptoContext';
import { Calendar } from 'lucide-react';

const TimeframeSelector = () => {
  const { timeframe, setTimeframe } = useCrypto();
  const timeframes = [
    { value: '1', label: '24H', mobileLabel: '24H' },
    { value: '7', label: '7D', mobileLabel: '7D' },
    { value: '14', label: '14D', mobileLabel: '14D' },
    { value: '30', label: '30D', mobileLabel: '30D' },
    { value: '90', label: '3M', mobileLabel: '3M' },
    { value: '365', label: '1Y', mobileLabel: '1Y' },
  ];

  return (
    <div className="w-full">
      {/* Desktop view */}
      <div className="hidden sm:flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {timeframes.map((tf) => (
          <button
            key={tf.value}
            onClick={() => setTimeframe(tf.value)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
              timeframe === tf.value
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm scale-105'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:scale-105'
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>
      
      {/* Mobile view - Scrollable horizontal */}
      <div className="sm:hidden">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-xs text-gray-500">Timeframe</span>
        </div>
        <div className="flex overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          <div className="flex gap-1">
            {timeframes.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setTimeframe(tf.value)}
                className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  timeframe === tf.value
                    ? 'bg-blue-500 text-white shadow-md scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tf.mobileLabel}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeframeSelector;