'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { fetchProductsByCategory } from '@/app/services/api';
import type { Product } from '@/types';
import { FiShoppingCart } from 'react-icons/fi';
import { FiTag,
FiHome, FiGrid } from 'react-icons/fi';

export default function CategoryPage() {
  const { id } = useParams() as { id?: string };
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    if (!id) {
      setError('Category ID is required');
      setLoading(false);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const { data } = await fetchProductsByCategory(+id);
        setProducts(data ?? []);
        setCategoryName(data?.[0]?.category?.name ?? 'Không xác định');
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Không thể tải sản phẩm');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleAddToCart = async (productId: number) => {
    try {
      // giả sử bạn có addToCart ở api
      await fetch(`/api/cart`, { method: 'POST', body: JSON.stringify({ productId, quantity: 1 }) });
      alert('🎉 Đã thêm vào giỏ hàng!');
    } catch {
      alert('😥 Vui lòng đăng nhập để mua hàng!');
    }
  };

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto p-6">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-600 mb-4 space-x-2">
          <Link href="/" className="hover:underline flex items-center gap-1 text-gray-800 font-medium"><FiHome />Trang chủ</Link>
          <span>/</span>
          <Link href="/categories" className="hover:underline flex items-center gap-1 text-gray-800 font-medium"><FiGrid />Danh mục</Link>
          <span>/</span>
          <span className="flex items-center gap-1 text-gray-800 font-medium">{categoryName}</span>
        </div>

        <h1 className="text-3xl font-bold mb-6"> <FiTag/>
{categoryName}</h1>

        {loading && (
          <p className="text-center text-gray-500">⏳ Đang tải sản phẩm...</p>
        )}

        {!loading && error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-500">
            Không có sản phẩm trong danh mục này.
          </p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group relative bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
                <Link href={`/product/${product.id}`} className="block">
                  <img
                    src={product.imageUrl || '/placeholder.png'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <h2 className="text-lg font-semibold text-gray-800 truncate">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 text-sm h-12 overflow-hidden">
                      {product.description}
                    </p>
                    <p className="text-blue-600 font-bold">
                      {product.price?.toLocaleString()}₫
                    </p>
                    <p className="text-sm text-gray-500">
                      Kho: {product.instock}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-lg opacity-0 group-hover:opacity-100 transition"
                >
                  <div className="flex items-center justify-center gap-2">
                    <FiShoppingCart /> Thêm vào giỏ
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
