'use client';

import { useState, useCallback } from 'react';
import { FilterState } from '@/types/filter';

const initialFilterState: FilterState = {
  brands: [],
  priceRange: [0, 50000],
  categories: [],
  availability: [],
  condition: [],
  searchQuery: '',
  sortBy: 'popularity',
};

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilterState);
  }, []);

  const toggleBrand = useCallback((brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand],
    }));
  }, []);

  return {
    filters,
    updateFilters,
    resetFilters,
    toggleBrand,
  };
}
