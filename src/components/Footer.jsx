// src/components/Footer.jsx - Ultra Minimal
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
      <div className="container mx-auto px-4 py-6">
        
        {/* Simple Links Row */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">Markets</a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">Portfolio</a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">Watchlist</a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">Learn</a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">API</a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">About</a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">Privacy</a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">Terms</a>
        </div>
        
        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            © 2024 Crypto Dashboard • Real-time cryptocurrency analytics
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Data from CoinGecko API • This is a demo project
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;