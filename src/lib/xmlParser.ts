import { parseStringPromise } from 'xml2js';
import { Product } from '@/types/product';
import fs from 'fs/promises';
import path from 'path';

interface XMLItem {
  [key: string]: string[] | undefined;
}

interface XMLResult {
  rss?: {
    channel?: Array<{
      item?: XMLItem[];
    }>;
  };
}

export async function parseProductFeed(): Promise<Product[]> {
  try {
    // Try to read from ProductFeed/current directory first
    let xmlPath = path.join(process.cwd(), 'ProductFeed', 'current', 'product_feed.xml');
    let xmlContent: string;

    try {
      xmlContent = await fs.readFile(xmlPath, 'utf-8');
    } catch {
      // Fallback to root directory
      xmlPath = path.join(process.cwd(), 'product_feed.xml');
      try {
        xmlContent = await fs.readFile(xmlPath, 'utf-8');
      } catch {
        console.warn('No product feed found, returning empty array');
        return [];
      }
    }

    const result: XMLResult = await parseStringPromise(xmlContent);
    const items = result.rss?.channel?.[0]?.item || [];

    const products: Product[] = items.map((item: XMLItem, index: number) => {
      const getField = (field: string) => item[field]?.[0] || '';
      const getPrice = (priceStr: string) => {
        const cleanPrice = priceStr.replace(/[^0-9.]/g, '');
        return parseFloat(cleanPrice) || 0;
      };

      return {
        id: getField('g:id') || `product-${index}`,
        title: getField('title'),
        description: getField('description'),
        link: getField('link'),
        image_link: getField('g:image_link'),
        price: getPrice(getField('g:price')),
        currency: 'SEK',
        brand: getField('g:brand'),
        availability: getField('g:availability'),
        condition: getField('g:condition') || 'new',
        gtin: getField('g:gtin'),
        mpn: getField('g:mpn'),
        category: getField('g:google_product_category'),
        product_type: getField('g:product_type'),
      };
    });

    return products;
  } catch (error) {
    console.error('Error parsing product feed:', error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await parseProductFeed();
  return products.find((p) => p.id === id) || null;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await parseProductFeed();
  return products.filter((p) =>
    p.product_type?.toLowerCase().includes(category.toLowerCase())
  );
}

export async function searchProducts(query: string): Promise<Product[]> {
  const products = await parseProductFeed();
  const lowerQuery = query.toLowerCase();
  
  return products.filter((p) =>
    p.title.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.brand.toLowerCase().includes(lowerQuery)
  );
}
