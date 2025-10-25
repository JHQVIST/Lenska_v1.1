'use client';

import React from 'react';
import { PricePoint } from '@/types/product';
import { formatPrice } from '@/lib/utils';

interface PriceHistoryChartProps {
  priceHistory: PricePoint[];
  currency: string;
}

export function PriceHistoryChart({ priceHistory, currency }: PriceHistoryChartProps) {
  if (!priceHistory || priceHistory.length === 0) {
    return null;
  }

  const prices = priceHistory.map(p => p.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const priceRange = maxPrice - minPrice;
  
  // Generate SVG path
  const width = 800;
  const height = 200;
  const padding = 40;
  
  const points = priceHistory.map((point, index) => {
    const x = (index / (priceHistory.length - 1)) * (width - 2 * padding) + padding;
    const y = height - padding - ((point.price - minPrice) / priceRange) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  const currentPrice = priceHistory[priceHistory.length - 1].price;
  const oldestPrice = priceHistory[0].price;
  const priceChange = currentPrice - oldestPrice;
  const percentChange = ((priceChange / oldestPrice) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Price History (90 days)</h3>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Lowest:</span> {formatPrice(minPrice, currency)}
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Highest:</span> {formatPrice(maxPrice, currency)}
          </div>
          <div className={`text-sm font-medium ${priceChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
            {priceChange < 0 ? '↓' : '↑'} {Math.abs(parseFloat(percentChange))}%
          </div>
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
          style={{ maxHeight: '250px' }}
        >
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => {
            const y = padding + ((height - 2 * padding) / 4) * i;
            return (
              <line
                key={i}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            );
          })}

          {/* Price line */}
          <polyline
            points={points}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Fill area under line */}
          <polygon
            points={`${padding},${height - padding} ${points} ${width - padding},${height - padding}`}
            fill="url(#gradient)"
            opacity="0.2"
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Y-axis labels */}
          {[0, 1, 2, 3, 4].map((i) => {
            const price = maxPrice - (priceRange / 4) * i;
            const y = padding + ((height - 2 * padding) / 4) * i;
            return (
              <text
                key={i}
                x={padding - 10}
                y={y + 5}
                textAnchor="end"
                fontSize="12"
                fill="#6b7280"
              >
                {Math.round(price)}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 text-sm text-gray-500 text-center">
        Data shown for the last 90 days • Updated daily
      </div>
    </div>
  );
}
