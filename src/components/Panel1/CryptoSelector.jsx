// src/components/Panel1/CryptoSelector.jsx - Mobile responsive
import React, { useState } from 'react';
import { useCrypto } from '../../context/CryptoContext';
import { Search, ChevronDown, X } from 'lucide-react';

const popularCryptos = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'solana', name: 'Solana', symbol: 'SOL' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
  { id: 'ripple', name: 'Ripple', symbol: 'XRP' },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
  { id: 'chainlink', name: 'Chainlink', symbol: 'LINK' },
];

const CryptoSelector = () => {
  const { selectedCrypto, setSelectedCrypto } = useCrypto();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCryptos = popularCryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCryptoInfo = popularCryptos.find(c => c.id === selectedCrypto);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
            <span className="font-bold text-xs sm:text-sm">
              {selectedCryptoInfo?.symbol.charAt(0) || 'C'}
            </span>
          </div>
          <div className="text-left overflow-hidden">
            <p className="font-medium text-sm sm:text-base truncate">
              {selectedCryptoInfo?.name || 'Select Crypto'}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
              {selectedCryptoInfo?.symbol || ''}
            </p>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 sm:bg-transparent sm:fixed-0"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="fixed sm:absolute bottom-0 left-0 right-0 sm:bottom-auto sm:top-full sm:mt-2 w-full sm:w-64 bg-gray-900 sm:bg-gray-800 dark:bg-gray-900 rounded-t-2xl sm:rounded-lg shadow-xl z-50 border border-gray-800 sm:border-gray-700 max-h-[70vh] sm:max-h-96 flex flex-col">
            {/* Mobile header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800 sm:hidden">
              <h3 className="font-semibold">Select Cryptocurrency</h3>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Search */}
            <div className="p-3 border-b border-gray-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus={isOpen}
                />
              </div>
            </div>
            
            {/* Crypto list */}
            <div className="flex-1 overflow-y-auto">
              {filteredCryptos.length > 0 ? (
                filteredCryptos.map((crypto) => (
                  <button
                    key={crypto.id}
                    onClick={() => {
                      setSelectedCrypto(crypto.id);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-800 transition-colors ${
                      selectedCrypto === crypto.id ? 'bg-gray-800' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-sm">{crypto.symbol.charAt(0)}</span>
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <p className="font-medium truncate">{crypto.name}</p>
                      <p className="text-sm text-gray-400 truncate">{crypto.symbol}</p>
                    </div>
                    {selectedCrypto === crypto.id && (
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    )}
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-gray-400">
                  No cryptocurrencies found
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CryptoSelector;