import React from 'react';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/xmlParser';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductDetails } from '@/components/products/ProductDetails';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <ProductDetails product={product} />
      </main>
      <Footer />
    </div>
  );
}
