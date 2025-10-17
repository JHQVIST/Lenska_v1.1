'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        setActiveCategory(null);
      }}
    >
      <button className="flex items-center space-x-1 px-4 py-2 text-gray-700 font-medium hover:text-gray-900 transition-colors">
        <span>Categories</span>
        <ChevronDownIcon className={cn(
          'h-4 w-4 transition-transform duration-200',
          isOpen && 'rotate-180'
        )} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-screen max-w-4xl bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="grid grid-cols-3 gap-0">
            {/* Category List */}
            <div className="col-span-1 border-r border-gray-200 py-4">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  className={cn(
                    'flex items-center space-x-3 px-6 py-3 hover:bg-gray-50 transition-colors',
                    activeCategory === category.id && 'bg-blue-50'
                  )}
                  onMouseEnter={() => setActiveCategory(category.id)}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{category.name}</div>
                    <div className="text-xs text-gray-500">{category.count} products</div>
                  </div>
                  <ChevronDownIcon className="h-4 w-4 text-gray-400 -rotate-90" />
                </Link>
              ))}
            </div>

            {/* Subcategories */}
            <div className="col-span-2 py-4 px-6">
              {activeCategory && (
                <>
                  {CATEGORIES.find(c => c.id === activeCategory)?.subcategories && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Subcategories
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {CATEGORIES.find(c => c.id === activeCategory)?.subcategories?.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/${CATEGORIES.find(c => c.id === activeCategory)?.slug}/${sub.slug}`}
                            className="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                          >
                            <div className="font-medium text-gray-900">{sub.name}</div>
                            <div className="text-xs text-gray-500">{sub.count} products</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {!CATEGORIES.find(c => c.id === activeCategory)?.subcategories && (
                    <div className="text-center py-8 text-gray-500">
                      <p>Hover over a category to see subcategories</p>
                    </div>
                  )}
                </>
              )}

              {!activeCategory && (
                <div className="text-center py-8 text-gray-500">
                  <p>Hover over a category to see options</p>
                </div>
              )}
            </div>
          </div>

          {/* Popular Searches */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Popular Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Canon EOS R6', 'Sony A7 III', 'Nikon Z6', 'Fujifilm X-T4'].map((search) => (
                <Link
                  key={search}
                  href={`/search?q=${encodeURIComponent(search)}`}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
                >
                  {search}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
