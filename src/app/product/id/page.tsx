import React from 'react';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/xmlParser';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductDetails } from '@/components/products/ProductDetails';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

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
