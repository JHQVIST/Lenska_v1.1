import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllProducts } from '@/lib/productService';
import { CATEGORIES, POPULAR_SEARCHES } from '@/lib/constants';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchBar } from '@/components/ui/SearchBar';
import { ProductCard } from '@/components/products/ProductCard';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const featuredProducts = await getAllProducts(8, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Background Image */}
        <div className="relative bg-gray-900 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/hero-camera-background.jpg"
              alt="Camera equipment background"
              fill
              className="object-cover opacity-40"
              priority
            />
            {/* 
              🎨 COLOR OVERLAY - CHANGE COLORS HERE:
              Change "from-blue-900" and "to-blue-700" to any Tailwind color
              Examples:
              - Red: from-red-900 to-red-700
              - Green: from-green-900 to-green-700
              - Purple: from-purple-900 to-purple-700
              - Gray: from-gray-900 to-gray-700
              
              Change "opacity-100" to control transparency (0-100)
            */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-0"></div>
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Find, Compare, Save
              </h1>
              <p className="text-xl text-blue-100 mb-12">
                Compare prices on camera equipment across leading retailers
              </p>

              {/* Search Bar - CENTERED */}
              <div className="flex justify-center mb-8">
                <div className="w-full max-w-3xl">
                  <SearchBar />
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center text-white/90 text-sm mb-8">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Tracking thousands of products across multiple retailers
              </div>

              {/* Popular Searches - CENTERED */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-blue-100 text-sm font-medium">Popular searches:</span>
                <div className="flex flex-wrap justify-center gap-2">
                  {POPULAR_SEARCHES.map((search) => (
                    <Link
                      key={search}
                      href={`/search?q=${encodeURIComponent(search)}`}
                      className="px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white hover:bg-white/20 transition-colors"
                    >
                      {search}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
                <div className="text-gray-600">Products tracked</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Retailers compared</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">Daily</div>
                <div className="text-gray-600">Price updates</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">Free</div>
                <div className="text-gray-600">Always free</div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  className="group bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg hover:border-blue-500 transition-all duration-200"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">{category.count} products</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <div className="py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Featured Products
                </h2>
                <Link
                  href="/products"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* How It Works */}
        <div className="bg-blue-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Search</h3>
                <p className="text-gray-600">
                  {"Find the camera or equipment you're looking for"}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Compare</h3>
                <p className="text-gray-600">
                  Compare prices from multiple retailers
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Save</h3>
                <p className="text-gray-600">
                  Get the best deal and save money
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
