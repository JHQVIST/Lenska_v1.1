import { NextRequest, NextResponse } from 'next/server';
import { getProductsByCategory, getAllProducts } from '@/lib/productService';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    let products;
    
    if (category) {
      // Get products by category
      products = await getProductsByCategory(category, 100);
    } else {
      // Get all products
      products = await getAllProducts(100);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
