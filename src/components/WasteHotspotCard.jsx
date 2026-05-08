import React from 'react';

const WasteHotspotCard = ({ zoneName, wasteLevel }) => {
  // Determine color based on waste level percentage
  const getColor = (level) => {
    if (level < 50) return '#22c55e'; // Green
    if (level <= 80) return '#eab308'; // Yellow
    return '#ef4444'; // Red
  };

  const safeWasteLevel = Math.min(Math.max(wasteLevel || 0, 0), 100);
  const color = getColor(safeWasteLevel);

  // SVG configuration
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (safeWasteLevel / 100) * circumference;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center gap-4 transition-all hover:shadow-md">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 text-center">{zoneName}</h3>
      
      <div className="relative flex items-center justify-center">
        {/* Background Ring */}
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="text-zinc-100 dark:text-zinc-800"
          />
          {/* Progress Ring */}
          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>
        
        {/* Percentage Text */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {Math.round(safeWasteLevel)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default WasteHotspotCard;
