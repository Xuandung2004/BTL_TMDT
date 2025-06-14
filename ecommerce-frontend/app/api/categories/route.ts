import { NextResponse } from 'next/server';
import type { Category } from '@/types';

const categories: Category[] = [
  {
    id: 1,
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?q=80&w=1000&auto=format&fit=crop',
    link: '/category/accessories'
  },
  {
    id: 2,
    name: 'Jewellery',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop',
    link: '/category/jewellery'
  },
  {
    id: 3,
    name: 'Denims',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000&auto=format&fit=crop',
    link: '/category/denims'
  },
  {
    id: 4,
    name: 'Tops',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop',
    link: '/category/tops'
  },
  {
    id: 5,
    name: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
    link: '/category/dresses'
  }
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: 'Categories fetched successfully',
      data: categories
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch categories',
        data: null
      },
      { status: 500 }
    );
  }
} 