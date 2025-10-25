import { Product } from '@/types/product';
import { 
  getAllProducts as getSupabaseProducts,
  getProductByProductId,
  getProductsByCategory as getSupabaseCategoryProducts,
  searchProducts as searchSupabaseProducts,
  DbProduct
} from './database';
import { parseProductFeed, getProductById as getXmlProduct } from './xmlParser';

/**
 * Configuration: Switch between XML and Supabase
 */
const USE_SUPABASE = process.env.NEXT_PUBLIC_USE_SUPABASE === 'true';

/**
 * Convert database product to app product format
 */
function dbProductToProduct(dbProduct: DbProduct): Product {
  return {
    id: dbProduct.product_id,
    title: dbProduct.title,
    description: dbProduct.description || '',
    link: `https://example.com/product/${dbProduct.product_id}`,
    image_link: dbProduct.image_url || '',
    price: 0, // Will be populated from offers
    currency: 'SEK',
    brand: dbProduct.brand || '',
    availability: 'in stock',
    condition: dbProduct.condition,
    gtin: dbProduct.gtin || undefined,
    mpn: dbProduct.mpn || undefined,
    category: dbProduct.category || undefined,
    product_type: dbProduct.product_type || undefined,
  };
}

/**
 * Get all products (with pagination)
 */
export async function getAllProducts(limit = 50, offset = 0): Promise<Product[]> {
  if (USE_SUPABASE) {
    const dbProducts = await getSupabaseProducts(limit, offset);
    return dbProducts.map(dbProductToProduct);
  } else {
    // Fallback to XML
    const allProducts = await parseProductFeed();
    return allProducts.slice(offset, offset + limit);
  }
}

/**
 * Get a single product by ID
 */
export async function getProductById(productId: string): Promise<Product | null> {
  if (USE_SUPABASE) {
    const dbProduct = await getProductByProductId(productId);
    return dbProduct ? dbProductToProduct(dbProduct) : null;
  } else {
    // Fallback to XML
    return await getXmlProduct(productId);
  }
}

/**
 * Get products by category
 */
export async function getProductsByCategory(category: string, limit = 50): Promise<Product[]> {
  if (USE_SUPABASE) {
    const dbProducts = await getSupabaseCategoryProducts(category, limit);
    return dbProducts.map(dbProductToProduct);
  } else {
    // Fallback to XML
    const allProducts = await parseProductFeed();
    return allProducts
      .filter(p => 
        p.product_type?.toLowerCase().includes(category.toLowerCase()) ||
        p.category?.toLowerCase().includes(category.toLowerCase())
      )
      .slice(0, limit);
  }
}

/**
 * Search products
 */
export async function searchProducts(query: string, limit = 50): Promise<Product[]> {
  if (USE_SUPABASE) {
    const dbProducts = await searchSupabaseProducts(query, limit);
    return dbProducts.map(dbProductToProduct);
  } else {
    // Fallback to XML
    const allProducts = await parseProductFeed();
    const lowercaseQuery = query.toLowerCase();
    return allProducts
      .filter(p => 
        p.title.toLowerCase().includes(lowercaseQuery) ||
        p.description.toLowerCase().includes(lowercaseQuery)
      )
      .slice(0, limit);
  }
}
