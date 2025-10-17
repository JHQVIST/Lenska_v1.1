'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/constants';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="overflow-y-auto h-full pb-20">
          <div className="px-4 py-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Categories
            </h3>
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                onClick={onClose}
                className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-gray-100"
              >
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <div className="font-medium text-gray-900">{category.name}</div>
                  <div className="text-xs text-gray-500">{category.count} products</div>
                </div>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
