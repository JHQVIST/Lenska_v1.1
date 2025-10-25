import { parseProductFeed } from '../lib/xmlParser';
import { bulkInsertProducts, getMerchantByMerchantId, bulkInsertProductOffers } from '../lib/database';
import { DbProduct, DbProductOffer } from '../lib/database';

/**
 * Import products from XML feed to Supabase
 */
export async function importFeedToSupabase() {
  console.log('🚀 Starting feed import to Supabase...');

  try {
    // 1. Parse XML feed
    console.log('📦 Parsing XML feed...');
    const products = await parseProductFeed();
    console.log(`✅ Found ${products.length} products`);

    // 2. Transform to database format
    console.log('🔄 Transforming products...');
    const dbProducts: Omit<DbProduct, 'id' | 'created_at' | 'updated_at'>[] = products.map(p => ({
      product_id: p.id,
      title: p.title,
      description: p.description,
      brand: p.brand,
      category: p.category || null,
      product_type: p.product_type || null,
      image_url: p.image_link,
      condition: p.condition || 'new',
      gtin: p.gtin || null,
      mpn: p.mpn || null,
    }));

    // 3. Insert products
    console.log('💾 Inserting products into Supabase...');
    const insertedProducts = await bulkInsertProducts(dbProducts);
    console.log(`✅ Inserted ${insertedProducts.length} products`);

    // 4. Create sample offers for each product
    console.log('💰 Creating sample product offers...');
    
    // Get a merchant (we'll use the first one)
    const merchant = await getMerchantByMerchantId('fotosidan');
    if (!merchant) {
      throw new Error('Merchant not found');
    }

    const offers: Omit<DbProductOffer, 'id' | 'created_at' | 'updated_at'>[] = insertedProducts.map(product => ({
      product_id: product.id,
      merchant_id: merchant.id,
      price: Math.round(Math.random() * 10000 + 1000), // Random price 1000-11000
      currency: 'SEK',
      shipping_cost: Math.random() > 0.5 ? 0 : Math.round(Math.random() * 100),
      availability: 'in stock',
      delivery_time: '1-3 days',
      product_url: `https://example.com/product/${product.product_id}`,
    }));

    const insertedOffers = await bulkInsertProductOffers(offers);
    console.log(`✅ Inserted ${insertedOffers.length} product offers`);

    console.log('🎉 Feed import completed successfully!');
    return {
      productsImported: insertedProducts.length,
      offersCreated: insertedOffers.length,
    };
  } catch (error) {
    console.error('❌ Error importing feed:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  importFeedToSupabase()
    .then(result => {
      console.log('Final result:', result);
      process.exit(0);
    })
    .catch(error => {
      console.error('Failed:', error);
      process.exit(1);
    });
}
