import { supabase } from './supabase';

// Product types matching Supabase schema
export interface DbProduct {
  id: string;
  product_id: string;
  title: string;
  description: string | null;
  brand: string | null;
  category: string | null;
  product_type: string | null;
  image_url: string | null;
  condition: string;
  gtin: string | null;
  mpn: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbMerchant {
  id: string;
  merchant_id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  rating: number;
  review_count: number;
  is_active: boolean;
  created_at: string;
}

export interface DbProductOffer {
  id: string;
  product_id: string;
  merchant_id: string;
  price: number;
  currency: string;
  shipping_cost: number;
  availability: string;
  delivery_time: string | null;
  product_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbPriceHistory {
  id: string;
  product_id: string;
  merchant_id: string;
  price: number;
  currency: string;
  recorded_at: string;
}

// ============================================
// PRODUCT FUNCTIONS
// ============================================

/**
 * Get all products with pagination
 */
export async function getAllProducts(limit = 50, offset = 0) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data as DbProduct[];
}

/**
 * Get a single product by product_id
 */
export async function getProductByProductId(productId: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('product_id', productId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }
  return data as DbProduct;
}

/**
 * Get products by category
 */
export async function getProductsByCategory(category: string, limit = 50) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as DbProduct[];
}

/**
 * Search products by title or description
 */
export async function searchProducts(query: string, limit = 50) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as DbProduct[];
}

/**
 * Insert or update a product
 */
export async function upsertProduct(product: Omit<DbProduct, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('products')
    .upsert(
      {
        ...product,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'product_id' }
    )
    .select()
    .single();

  if (error) throw error;
  return data as DbProduct;
}

// ============================================
// MERCHANT FUNCTIONS
// ============================================

/**
 * Get all active merchants
 */
export async function getAllMerchants() {
  const { data, error } = await supabase
    .from('merchants')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) throw error;
  return data as DbMerchant[];
}

/**
 * Get merchant by merchant_id
 */
export async function getMerchantByMerchantId(merchantId: string) {
  const { data, error } = await supabase
    .from('merchants')
    .select('*')
    .eq('merchant_id', merchantId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as DbMerchant;
}

// ============================================
// PRODUCT OFFERS FUNCTIONS
// ============================================

/**
 * Get all offers for a specific product
 */
export async function getProductOffers(productId: string) {
  const { data, error } = await supabase
    .from('product_offers')
    .select(`
      *,
      merchants (*)
    `)
    .eq('product_id', productId)
    .order('price', { ascending: true });

  if (error) throw error;
  return data;
}

/**
 * Insert or update a product offer
 */
export async function upsertProductOffer(offer: Omit<DbProductOffer, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('product_offers')
    .upsert(
      {
        ...offer,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'product_id,merchant_id' }
    )
    .select()
    .single();

  if (error) throw error;
  return data as DbProductOffer;
}

// ============================================
// PRICE HISTORY FUNCTIONS
// ============================================

/**
 * Get price history for a product
 */
export async function getPriceHistory(productId: string, days = 90) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('price_history')
    .select(`
      *,
      merchants (name)
    `)
    .eq('product_id', productId)
    .gte('recorded_at', startDate.toISOString())
    .order('recorded_at', { ascending: true });

  if (error) throw error;
  return data;
}

/**
 * Record a price point
 */
export async function recordPriceHistory(
  productId: string,
  merchantId: string,
  price: number,
  currency: string = 'SEK'
) {
  const { data, error } = await supabase
    .from('price_history')
    .insert({
      product_id: productId,
      merchant_id: merchantId,
      price,
      currency,
    })
    .select()
    .single();

  if (error) throw error;
  return data as DbPriceHistory;
}

// ============================================
// BULK OPERATIONS
// ============================================

/**
 * Bulk insert products (for feed imports)
 */
export async function bulkInsertProducts(products: Omit<DbProduct, 'id' | 'created_at' | 'updated_at'>[]) {
  const { data, error } = await supabase
    .from('products')
    .upsert(
      products.map(p => ({
        ...p,
        updated_at: new Date().toISOString(),
      })),
      { onConflict: 'product_id' }
    )
    .select();

  if (error) throw error;
  return data as DbProduct[];
}

/**
 * Bulk insert product offers (for feed imports)
 */
export async function bulkInsertProductOffers(offers: Omit<DbProductOffer, 'id' | 'created_at' | 'updated_at'>[]) {
  const { data, error } = await supabase
    .from('product_offers')
    .upsert(
      offers.map(o => ({
        ...o,
        updated_at: new Date().toISOString(),
      })),
      { onConflict: 'product_id,merchant_id' }
    )
    .select();

  if (error) throw error;
  return data as DbProductOffer[];
}
