// src/components/MarketOverview.jsx
import React from 'react';
import { TrendingUp, TrendingDown, BarChart3, Users, Globe } from 'lucide-react';

const MarketOverview = () => {
  const marketStats = [
    { label: 'Market Cap', value: '$2.4T', change: '+2.4%', icon: <Globe size={16} /> },
    { label: '24h Volume', value: '$86.5B', change: '+15.2%', icon: <BarChart3 size={16} /> },
    { label: 'BTC Dominance', value: '52.4%', change: '+0.8%', icon: <TrendingUp size={16} /> },
    { label: 'Fear & Greed', value: '76', change: 'Extreme Greed', icon: <Users size={16} /> },
  ];
  
  return (
   <>

   </>
  );
};

export default MarketOverview;