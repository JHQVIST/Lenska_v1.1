import { Category } from '@/types/category';

export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Digital Cameras',
    slug: 'digital-cameras',
    icon: '📷',
    count: 15,
    subcategories: [
      { id: '1-1', name: 'DSLR Cameras', slug: 'dslr', count: 5 },
      { id: '1-2', name: 'Mirrorless Cameras', slug: 'mirrorless', count: 5 },
      { id: '1-3', name: 'Compact Cameras', slug: 'compact', count: 3 },
      { id: '1-4', name: 'Action Cameras', slug: 'action', count: 2 },
    ],
  },
  {
    id: '2',
    name: 'Lenses',
    slug: 'lenses',
    icon: '🔍',
    count: 5,
    subcategories: [
      { id: '2-1', name: 'Wide Angle', slug: 'wide-angle', count: 2 },
      { id: '2-2', name: 'Telephoto', slug: 'telephoto', count: 2 },
      { id: '2-3', name: 'Prime Lenses', slug: 'prime', count: 1 },
    ],
  },
  {
    id: '3',
    name: 'Film Cameras',
    slug: 'film-cameras',
    icon: '🎞️',
    count: 2,
    subcategories: [
      { id: '3-1', name: '35mm Film', slug: '35mm', count: 1 },
      { id: '3-2', name: 'Instant Cameras', slug: 'instant', count: 1 },
    ],
  },
  {
    id: '4',
    name: 'Bags',
    slug: 'bags',
    icon: '🎒',
    count: 2,
    subcategories: [
      { id: '4-1', name: 'Backpacks', slug: 'backpacks', count: 1 },
      { id: '4-2', name: 'Shoulder Bags', slug: 'shoulder', count: 1 },
    ],
  },
  {
    id: '5',
    name: 'Cameras',
    slug: 'cameras',
    icon: '📸',
    count: 1,
  },
  {
    id: '6',
    name: 'Accessories',
    slug: 'accessories',
    icon: '🔧',
    count: 1,
    subcategories: [
      { id: '6-1', name: 'Tripods', slug: 'tripods', count: 0 },
      { id: '6-2', name: 'Memory Cards', slug: 'memory-cards', count: 0 },
      { id: '6-3', name: 'Batteries', slug: 'batteries', count: 0 },
    ],
  },
];

export const POPULAR_SEARCHES = [
  'Canon EOS R6',
  'Sony A7 III',
  'Nikon Z6',
  'Fujifilm X-T4',
  'Camera Lenses',
];

export const BRANDS = [
  'Canon',
  'Nikon',
  'Sony',
  'Fujifilm',
  'Panasonic',
  'Olympus',
  'Leica',
  'Hasselblad',
  'Pentax',
  'Sigma',
  'Tamron',
];

export const PRICE_RANGES = [
  { label: 'Under 500 SEK', min: 0, max: 500 },
  { label: '500 - 2,000 SEK', min: 500, max: 2000 },
  { label: '2,000 - 10,000 SEK', min: 2000, max: 10000 },
  { label: 'Over 10,000 SEK', min: 10000, max: 999999 },
];
