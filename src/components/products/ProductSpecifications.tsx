'use client';

import React, { useState } from 'react';
import { ProductSpecification } from '@/types/product';

interface ProductSpecificationsProps {
  specifications: ProductSpecification[];
}

export function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Group specifications by category
  const groupedSpecs = specifications.reduce((acc, spec) => {
    const category = spec.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(spec);
    return acc;
  }, {} as Record<string, ProductSpecification[]>);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Technical Specifications</h3>

      <div className="space-y-4">
        {Object.entries(groupedSpecs).map(([category, specs]) => (
          <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
              className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
            >
              <span className="font-semibold text-gray-900">{category}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  expandedCategory === category ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedCategory === category && (
              <div className="divide-y divide-gray-200">
                {specs.map((spec, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 grid grid-cols-2 gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <dt className="text-sm font-medium text-gray-600">{spec.name}</dt>
                    <dd className="text-sm text-gray-900">{spec.value}</dd>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">Specification Notice</h4>
            <p className="text-sm text-blue-800">
              Specifications are provided by manufacturers and may vary. Always verify specifications with the merchant before purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
