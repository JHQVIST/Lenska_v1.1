export interface Product {
  id: string;
  title: string;
  description: string;
  link: string;
  image_link: string;
  price: number;
  currency: string;
  brand: string;
  availability: string;
  condition: string;
  gtin?: string;
  mpn?: string;
  category?: string;
  product_type?: string;
}

// Simplified: Just "in stock" - matches real merchant feeds
export interface MerchantOffer {
  merchantId: string;
  merchantName: string;
  merchantLogo?: string;
  price: number;
  currency: string;
  shipping: number;
  shippingInfo: string;
  availability: string; // Will be "in stock" from feeds
  deliveryTime: string;
  rating: number;
  reviewCount: number;
  url: string;
  lastUpdated: string;
}

export interface ProductWithOffers extends Product {
  offers: MerchantOffer[];
  lowestPrice: number;
  highestPrice: number;
  averagePrice: number;
  priceHistory?: PricePoint[];
  specifications?: ProductSpecification[];
  similarProducts?: Product[];
}

export interface PricePoint {
  date: string;
  price: number;
  merchant: string;
}

export interface ProductSpecification {
  name: string;
  value: string;
  category?: string;
}
