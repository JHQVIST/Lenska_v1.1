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

export interface ProductWithRetailers extends Product {
  retailers: Retailer[];
  lowestPrice: number;
  highestPrice: number;
  averagePrice: number;
}

export interface Retailer {
  name: string;
  price: number;
  url: string;
  availability: string;
  shipping?: number;
}
