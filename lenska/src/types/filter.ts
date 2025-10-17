export interface FilterOptions {
  brands: string[];
  priceRange: [number, number];
  categories: string[];
  availability: string[];
  condition: string[];
  searchQuery: string;
}

export interface FilterState extends FilterOptions {
  sortBy: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'popularity';
}
