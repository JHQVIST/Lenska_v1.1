'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '@/components/ui/Icons';
import { CATEGORIES } from '@/lib/constants';

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ');
}

export function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setActiveCategory(null);
    }, 300); // 300ms delay before closing
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={menuRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center space-x-1 px-4 py-2 text-gray-700 font-medium hover:text-gray-900 transition-colors">
        <span>Categories</span>
        <ChevronDownIcon className={cn(
          'h-4 w-4 transition-transform duration-200',
          isOpen && 'rotate-180'
        )} />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-screen max-w-5xl bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
          <div className="grid grid-cols-3 gap-0">
            {/* Category List */}
            <div className="col-span-1 border-r border-gray-200 py-4">
              {CATEGORIES.map((category) => (
                <div
                  key={category.id}
                  className={cn(
                    'flex items-center space-x-3 px-6 py-3 hover:bg-gray-50 transition-colors cursor-pointer',
                    activeCategory === category.id && 'bg-blue-50'
                  )}
                  onMouseEnter={() => setActiveCategory(category.id)}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <div className="flex-1">
                    <Link 
                      href={`/${category.slug}`}
                      className="block font-medium text-gray-900 hover:text-blue-600"
                    >
                      {category.name}
                    </Link>
                    <div className="text-xs text-gray-500">{category.count} products</div>
                  </div>
                  {category.subcategories && (
                    <ChevronDownIcon className="h-4 w-4 text-gray-400 -rotate-90" />
                  )}
                </div>
              ))}
            </div>

            {/* Subcategories */}
            <div className="col-span-2 py-6 px-8">
              {activeCategory ? (
                <>
                  {CATEGORIES.find(c => c.id === activeCategory)?.subcategories && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                        {CATEGORIES.find(c => c.id === activeCategory)?.name} Subcategories
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {CATEGORIES.find(c => c.id === activeCategory)?.subcategories?.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/${CATEGORIES.find(c => c.id === activeCategory)?.slug}/${sub.slug}`}
                            className="px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors border border-transparent hover:border-blue-200"
                          >
                            <div className="font-medium text-gray-900">{sub.name}</div>
                            <div className="text-xs text-gray-500 mt-1">{sub.count} products</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {!CATEGORIES.find(c => c.id === activeCategory)?.subcategories && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <svg className="w-16 h-16 mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <p className="text-sm">No subcategories available</p>
                      <Link 
                        href={`/${CATEGORIES.find(c => c.id === activeCategory)?.slug}`}
                        className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View all products →
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <svg className="w-16 h-16 mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <p className="text-sm">Hover over a category to see details</p>
                </div>
              )}
            </div>
          </div>

          {/* Popular Searches */}
          <div className="border-t border-gray-200 px-8 py-4 bg-gray-50 rounded-b-lg">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Popular Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Canon EOS R6', 'Sony A7 III', 'Nikon Z6', 'Fujifilm X-T4', 'Camera Lenses'].map((search) => (
                <Link
                  key={search}
                  href={`/search?q=${encodeURIComponent(search)}`}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
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
