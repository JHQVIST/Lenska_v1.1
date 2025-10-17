import React from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import { Button } from '../ui/Button';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {product.image_link ? (
            <Image
              src={product.image_link}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="text-sm text-gray-500 mb-2">{product.brand}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
          
          <div className="flex items-baseline space-x-4 mb-6">
            <span className="text-4xl font-bold text-gray-900">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.availability === 'in stock' && (
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                In Stock
              </span>
            )}
          </div>

          <div className="prose prose-sm text-gray-600 mb-6">
            <p>{product.description}</p>
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex items-center justify-between py-3 border-t border-gray-200">
              <span className="text-gray-600">Condition</span>
              <span className="font-semibold text-gray-900 capitalize">{product.condition}</span>
            </div>
            {product.mpn && (
              <div className="flex items-center justify-between py-3 border-t border-gray-200">
                <span className="text-gray-600">Model Number</span>
                <span className="font-semibold text-gray-900">{product.mpn}</span>
              </div>
            )}
          </div>

          <Button 
            variant="primary" 
            size="lg" 
            className="w-full"
            onClick={() => window.open(product.link, '_blank')}
          >
            View at Retailer
          </Button>

          <div className="mt-4 text-sm text-gray-500 text-center">
            <p>✓ Price comparison from multiple retailers</p>
            <p>✓ Free shipping available</p>
          </div>
        </div>
      </div>
    </div>
  );
}
