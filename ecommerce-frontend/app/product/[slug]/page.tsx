'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ImageGallery from '@/components/products/ImageGallery';
import ProductInfo from '@/components/products/ProductInfo';
import ProductVariants from '@/components/products/ProductVariants';

interface ProductDetail {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  brand: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  images: {
    id: number;
    url: string;
    isPrimary: boolean;
  }[];
  variants: {
    id: number;
    size: string;
    color: string;
    stock: number;
  }[];
  specifications: {
    material: string;
    origin: string;
    style: string;
    washingGuide: string;
  };
  rating: number;
  reviews: {
    id: number;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
    images?: string[];
  }[];
  relatedProducts: {
    id: number;
    name: string;
    slug: string;
    price: number;
    imageUrl: string;
  }[];
}

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductDetail['variants'][0] | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${params.slug}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
        setSelectedVariant(null); // Reset variant when product changes
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchProduct();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery Skeleton */}
            <div className="aspect-square bg-orange-50 rounded-lg"></div>
            
            {/* Product Info Skeleton */}
            <div className="space-y-4">
              <div className="h-8 bg-orange-50 rounded w-3/4"></div>
              <div className="h-6 bg-orange-50 rounded w-1/2"></div>
              <div className="h-10 bg-orange-50 rounded w-1/3"></div>
              <div className="h-24 bg-orange-50 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">Error</h2>
          <p className="text-gray-800 mt-2">{error || 'Product not found'}</p>
          <Link href="/" className="text-[#FFB629] hover:text-[#ffa600] mt-4 inline-block font-medium">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <nav className="text-sm">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link href="/" className="text-[#FFB629] hover:text-[#ffa600]">
                  Trang chủ
                </Link>
                <span className="mx-2 text-gray-500">/</span>
              </li>
              <li className="flex items-center">
                <Link
                  href={`/category/${product.category.slug}`}
                  className="text-[#FFB629] hover:text-[#ffa600]"
                >
                  {product.category.name}
                </Link>
                <span className="mx-2 text-gray-500">/</span>
              </li>
              <li className="text-gray-800">{product.name}</li>
            </ol>
          </nav>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image Gallery */}
          <div>
            <ImageGallery images={product.images} />
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-8">
            <ProductInfo
              name={product.name}
              price={product.price}
              discountPrice={product.discountPrice}
              rating={product.rating}
              description={product.description}
              brand={product.brand}
            />

            <ProductVariants
              variants={product.variants}
              onVariantChange={setSelectedVariant}
            />

            {/* Add to Cart Button */}
            <button
              disabled={!selectedVariant}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors
                ${selectedVariant
                  ? 'bg-[#FFB629] hover:bg-[#ffa600]'
                  : 'bg-gray-300 cursor-not-allowed'
                }`}
            >
              {selectedVariant ? 'Thêm vào giỏ hàng' : 'Vui lòng chọn phiên bản'}
            </button>

            {/* Product Specifications */}
            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thông số sản phẩm
              </h3>
              <dl className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-gray-600">Chất liệu:</dt>
                  <dd className="col-span-2 text-gray-900">{product.specifications.material}</dd>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-gray-600">Xuất xứ:</dt>
                  <dd className="col-span-2 text-gray-900">{product.specifications.origin}</dd>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-gray-600">Phong cách:</dt>
                  <dd className="col-span-2 text-gray-900">{product.specifications.style}</dd>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-gray-600">Hướng dẫn giặt:</dt>
                  <dd className="col-span-2 text-gray-900">{product.specifications.washingGuide}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 