// src/App.jsx
import React, { useEffect } from 'react';
import { CryptoProvider } from './context/CryptoContext';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import './index.css';

function App() {
  // Add a global error handler for API failures
  useEffect(() => {
    const handleGlobalError = (error) => {
      console.error('Global error:', error);
    };

    window.addEventListener('error', handleGlobalError);
    return () => window.removeEventListener('error', handleGlobalError);
  }, []);

  return (
    <CryptoProvider>
      <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
        <Header />
        <div className=" mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-6">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
            {/* Sidebar */}
            <div className="hidden lg:block lg:w-1/4 xl:w-1/5">
              <Sidebar />
            </div>
            
            {/* Main Content */}
            <div className="lg:w-3/4 xl:w-4/5">
              <Dashboard />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </CryptoProvider>
  );
}

export default App;