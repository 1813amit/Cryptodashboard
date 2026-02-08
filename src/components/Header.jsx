// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, Menu, Bell, User, 
  Moon, Sun, TrendingUp,
  ChevronDown, X
} from 'lucide-react';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Initialize dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems = [
    { label: 'Markets', href: '#' },
    { label: 'Portfolio', href: '#' },
    { label: 'Watchlist', href: '#' },
    { label: 'News', href: '#' },
    { label: 'Learn', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <TrendingUp className="text-primary dark:text-blue-400" size={20} />
            <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">CryptoDash</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                className="font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Search */}
            <div className="hidden lg:flex items-center relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-500"
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun className="text-yellow-500" size={20} />
              ) : (
                <Moon className="text-gray-700 dark:text-gray-300" size={20} />
              )}
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Bell className="text-gray-700 dark:text-gray-300" size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <User className="text-gray-700 dark:text-gray-300" size={18} />
              <span className="text-sm text-gray-700 dark:text-gray-300">Account</span>
              <ChevronDown className="text-gray-700 dark:text-gray-300" size={16} />
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {showMobileMenu ? (
                <X className="text-gray-700 dark:text-gray-300" size={20} />
              ) : (
                <Menu className="text-gray-700 dark:text-gray-300" size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-3 lg:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search cryptocurrency..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="mt-3 md:hidden">
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <a 
                    key={item.label} 
                    href={item.href}
                    className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;