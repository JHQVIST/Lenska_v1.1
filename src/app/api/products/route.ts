import { NextResponse } from 'next/server';
import { parseProductFeed, searchProducts, getProductsByCategory } from '@/lib/xmlParser';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let products;

    if (search) {
      products = await searchProducts(search);
    } else if (category) {
      products = await getProductsByCategory(category);
    } else {
      products = await parseProductFeed();
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
