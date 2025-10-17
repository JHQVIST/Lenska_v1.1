'use client';

import React, { useState } from 'react';
import { FilterSection } from './FilterSection';
import { FilterChip } from './FilterChip';
import { PriceRangeSlider } from './PriceRangerSlider';
import { BrandFilter } from './BrandFilter';
import { FilterState } from '@/types/filter';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  resultCount: number;
}

export function FilterSidebar({ filters, onFilterChange, resultCount }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brand: true,
    availability: false,
    condition: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handlePriceChange = (priceRange: [number, number]) => {
    onFilterChange({ ...filters, priceRange });
  };

  const clearAllFilters = () => {
    onFilterChange({
      brands: [],
      priceRange: [0, 50000],
      categories: [],
      availability: [],
      condition: [],
      searchQuery: '',
      sortBy: 'popularity',
    });
  };

  const activeFilterCount = 
    filters.brands.length + 
    filters.availability.length + 
    filters.condition.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000 ? 1 : 0);

  return (
    <aside className="w-full md:w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      {/* Filter Header */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all
            </button>
          )}
        </div>
        <p className="text-sm text-gray-600">
          {resultCount.toLocaleString()} products found
        </p>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Active Filters ({activeFilterCount})
          </p>
          <div className="flex flex-wrap gap-2">
            {filters.brands.map(brand => (
              <FilterChip
                key={brand}
                label={brand}
                onRemove={() => handleBrandToggle(brand)}
              />
            ))}
            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 50000) && (
              <FilterChip
                label={`${filters.priceRange[0]} - ${filters.priceRange[1]} SEK`}
                onRemove={() => handlePriceChange([0, 50000])}
              />
            )}
          </div>
        </div>
      )}

      {/* Price Range Filter */}
      <FilterSection
        title="Price Range"
        isExpanded={expandedSections.price}
        onToggle={() => toggleSection('price')}
      >
        <PriceRangeSlider
          min={0}
          max={50000}
          value={filters.priceRange}
          onChange={handlePriceChange}
        />
      </FilterSection>

      {/* Brand Filter */}
      <FilterSection
        title="Brand"
        isExpanded={expandedSections.brand}
        onToggle={() => toggleSection('brand')}
      >
        <BrandFilter
          selectedBrands={filters.brands}
          onBrandToggle={handleBrandToggle}
        />
      </FilterSection>

      {/* Availability Filter */}
      <FilterSection
        title="Availability"
        isExpanded={expandedSections.availability}
        onToggle={() => toggleSection('availability')}
      >
        <div className="space-y-2">
          {['In Stock', 'Out of Stock', 'Pre-order'].map((status) => (
            <label key={status} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                checked={filters.availability.includes(status)}
                onChange={() => {
                  const newAvailability = filters.availability.includes(status)
                    ? filters.availability.filter(a => a !== status)
                    : [...filters.availability, status];
                  onFilterChange({ ...filters, availability: newAvailability });
                }}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{status}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Condition Filter */}
      <FilterSection
        title="Condition"
        isExpanded={expandedSections.condition}
        onToggle={() => toggleSection('condition')}
      >
        <div className="space-y-2">
          {['New', 'Refurbished', 'Used'].map((cond) => (
            <label key={cond} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                checked={filters.condition.includes(cond)}
                onChange={() => {
                  const newCondition = filters.condition.includes(cond)
                    ? filters.condition.filter(c => c !== cond)
                    : [...filters.condition, cond];
                  onFilterChange({ ...filters, condition: newCondition });
                }}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{cond}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </aside>
  );
}
