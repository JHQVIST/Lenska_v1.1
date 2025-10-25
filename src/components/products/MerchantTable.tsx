'use client';

import React, { useState } from 'react';
import { MerchantOffer } from '@/types/product';
import { formatPrice } from '@/lib/utils';

interface MerchantTableProps {
  offers: MerchantOffer[];
  currency: string;
}

export function MerchantTable({ offers, currency }: MerchantTableProps) {
  const [sortBy, setSortBy] = useState<'price' | 'total' | 'rating'>('total');

  const sortedOffers = [...offers].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'total':
        return (a.price + a.shipping) - (b.price + b.shipping);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const bestDeal = sortedOffers[0];

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            Price Comparison
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="total">Total Price</option>
              <option value="price">Product Price</option>
              <option value="rating">Merchant Rating</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Merchant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shipping
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedOffers.map((offer) => {
              const isBestDeal = offer.merchantId === bestDeal.merchantId;
              const totalPrice = offer.price + offer.shipping;
              
              return (
                <tr
                  key={offer.merchantId}
                  className={`${isBestDeal ? 'bg-green-50' : ''} hover:bg-gray-50 transition-colors`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{offer.merchantLogo}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium text-gray-900">
                            {offer.merchantName}
                          </div>
                          {isBestDeal && (
                            <span className="px-2 py-0.5 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                              Best Deal
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {offer.deliveryTime}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatPrice(offer.price, currency)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${offer.shipping === 0 ? 'text-green-600 font-medium' : 'text-gray-900'}`}>
                      {offer.shipping === 0 ? 'Free' : formatPrice(offer.shipping, currency)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      {formatPrice(totalPrice, currency)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-900 font-medium">{offer.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({offer.reviewCount})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <a
                      href={offer.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        isBestDeal
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      View Deal
                      <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Prices last updated: {new Date().toLocaleString('sv-SE')}</span>
          <span>All prices include VAT • All products in stock</span>
        </div>
      </div>
    </div>
  );
}
