import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductById, parseProductFeed } from '@/lib/xmlParser';
import { generateMockOffers, generatePriceHistory, generateSpecifications } from '@/lib/mockData';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { MerchantTable } from '@/components/products/MerchantTable';
import { PriceHistoryChart } from '@/components/products/PriceHistoryChart';
import { ProductSpecifications } from '@/components/products/ProductSpecifications';
import { SimilarProducts } from '@/components/products/SimilarProducts';
import { formatPrice } from '@/lib/utils';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  // Generate enhanced product data (will come from Supabase later)
  const offers = generateMockOffers(product.price);
  const priceHistory = generatePriceHistory(product.price);
  const specifications = generateSpecifications(product.title);
  
  // Get similar products
  const allProducts = await parseProductFeed();
  const similarProducts = allProducts
    .filter(p => p.id !== product.id && p.brand === product.brand)
    .slice(0, 3);

  const lowestPrice = Math.min(...offers.map(o => o.price + o.shipping));
  const highestPrice = Math.max(...offers.map(o => o.price + o.shipping));
  const savingsAmount = highestPrice - lowestPrice;
  const savingsPercent = ((savingsAmount / highestPrice) * 100).toFixed(0);

  const [imageError, setImageError] = React.useState(false);
  const isValidImageUrl = product.image_link && 
    !product.image_link.includes('drive.google.com') &&
    (product.image_link.startsWith('http://') || product.image_link.startsWith('https://'));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: product.product_type || 'Products', href: '/products' },
              { label: product.brand, href: `/brand/${product.brand.toLowerCase()}` },
              { label: product.title },
            ]}
          />

          {/* Product Header */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="relative">
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {isValidImageUrl ? (
                    <Image
                      src={product.image_link}
                      alt={product.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <svg className="w-24 h-24 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm">Image not available</span>
                    </div>
                  )}
                </div>

                {/* Trust Badges */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Secure</span>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div>
                <div className="mb-4">
                  <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">
                    {product.brand}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">4.5 (124 reviews)</span>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 mb-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm text-gray-600">Lowest price</span>
                    <span className="text-3xl font-bold text-blue-600">
                      {formatPrice(lowestPrice, product.currency)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Compare {offers.length} merchants</span>
                    <span className="text-green-600 font-semibold">
                      Save up to {formatPrice(savingsAmount, product.currency)} ({savingsPercent}%)
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="prose prose-sm text-gray-600 mb-6">
                  <p>{product.description}</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Availability</div>
                    <div className="text-lg font-semibold text-gray-900 capitalize">
                      {product.availability}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Condition</div>
                    <div className="text-lg font-semibold text-gray-900 capitalize">
                      {product.condition}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#price-comparison"
                  className="block w-full bg-blue-600 text-white text-center px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Compare Prices from {offers.length} Merchants
                </a>
              </div>
            </div>
          </div>

          {/* Price Comparison Table */}
          <div id="price-comparison" className="mb-8">
            <MerchantTable offers={offers} currency={product.currency} />
          </div>

          {/* Price History */}
          <div className="mb-8">
            <PriceHistoryChart priceHistory={priceHistory} currency={product.currency} />
          </div>

          {/* Specifications */}
          <div className="mb-8">
            <ProductSpecifications specifications={specifications} />
          </div>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <SimilarProducts products={similarProducts} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
