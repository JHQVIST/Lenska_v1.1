'use client';

import React, { useState } from 'react';
import { BRANDS } from '@/lib/constants';
import { MagnifyingGlassIcon } from '@/components/ui/Icons';

interface BrandFilterProps {
  selectedBrands: string[];
  onBrandToggle: (brand: string) => void;
}

export function BrandFilter({ selectedBrands, onBrandToggle }: BrandFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredBrands = BRANDS.filter((brand) =>
    brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedBrands = showAll ? filteredBrands : filteredBrands.slice(0, 5);

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search brands..."
          className="w-full px-3 py-2 pl-9 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {displayedBrands.map((brand) => (
          <label key={brand} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => onBrandToggle(brand)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{brand}</span>
          </label>
        ))}
      </div>

      {filteredBrands.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          {showAll ? 'Show less' : `Show all (${filteredBrands.length})`}
        </button>
      )}
    </div>
  );
}
