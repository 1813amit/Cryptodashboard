// src/components/Panel1/PriceChart.jsx
import React from 'react';
import { 
  LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Area, AreaChart 
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const PriceChart = ({ data, chartType = 'line', showGrid = true, showLegend = false }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 shadow-xl">
          <p className="text-gray-400 text-sm mb-2">{dataPoint.date}</p>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Price:</span>
              <span className="text-lg font-bold text-white">
                {formatCurrency(dataPoint.price)}
              </span>
            </div>
            {dataPoint.changePercent !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Change:</span>
                <span className={`font-medium ${dataPoint.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {dataPoint.changePercent >= 0 ? '↗' : '↘'} {dataPoint.changePercent?.toFixed(2)}%
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Time:</span>
              <span className="text-sm text-gray-300">{dataPoint.time}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (chartType === 'line') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />}
          <XAxis 
            dataKey="date" 
            stroke="#9ca3af"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#9ca3af"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => {
              if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
              if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
              if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
              return `$${value.toFixed(0)}`;
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#3b82f6" 
            strokeWidth={2}
            fill="url(#colorPrice)" 
            fillOpacity={0.1}
          />
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  // Candlestick chart (simplified with line chart)
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReLineChart data={data}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />}
        <XAxis 
          dataKey="date" 
          stroke="#9ca3af"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          stroke="#9ca3af"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => {
            if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
            if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
            if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
            return `$${value.toFixed(0)}`;
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line 
          type="monotone" 
          dataKey="price" 
          stroke="#8b5cf6" 
          strokeWidth={3}
          dot={{ stroke: '#8b5cf6', strokeWidth: 2, r: 2 }}
          activeDot={{ r: 6, fill: '#8b5cf6' }}
        />
      </ReLineChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;