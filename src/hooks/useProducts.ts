'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { FilterState } from '@/types/filter';

export function useProducts(allProducts: Product[], filters: FilterState) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

  useEffect(() => {
    let result = [...allProducts];

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Filter by brands
    if (filters.brands.length > 0) {
      result = result.filter(p => filters.brands.includes(p.brand));
    }

    // Filter by price range
    result = result.filter(
      p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Filter by availability
    if (filters.availability.length > 0) {
      result = result.filter(p =>
        filters.availability.some(a => p.availability.toLowerCase().includes(a.toLowerCase()))
      );
    }

    // Filter by condition
    if (filters.condition.length > 0) {
      result = result.filter(p =>
        filters.condition.some(c => p.condition.toLowerCase().includes(c.toLowerCase()))
      );
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // popularity - keep original order
        break;
    }

    setFilteredProducts(result);
  }, [allProducts, filters]);

  return filteredProducts;
}
