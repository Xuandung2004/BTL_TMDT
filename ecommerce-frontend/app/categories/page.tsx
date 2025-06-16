'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCategories } from '@/app/services/api';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FiHome, FiGrid } from 'react-icons/fi';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCategories();
        setCategories(res.data);
      } catch (error) {
        console.error(' Lỗi khi lấy categories:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-600 mb-4 space-x-2">
          <Link href="/" className="hover:underline flex items-center gap-1">
            <FiHome /> Trang chủ
          </Link>
          <span>/</span>
          <div className="flex items-center gap-1 text-gray-800 font-medium">
            <FiGrid /> Danh mục
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          🛍️ Danh mục sản phẩm
        </h1>

        {/* Loading */}
        {loading ? (
          <p className="text-center text-gray-500 text-lg animate-pulse">
            Đang tải danh mục...
          </p>
        ) : categories.length === 0 ? (
          <p className="text-center text-red-500 text-lg">
            Không có danh mục nào được tìm thấy 😢
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group block overflow-hidden rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all bg-white"
              >
                <div className="relative h-48">
                  <img
                    src={
                      category.imageUrl ||
                      `https://source.unsplash.com/400x300/?${encodeURIComponent(
                        category.name
                      )}`
                    }
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 truncate">
                    {category.name}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {category.description ||
                      'Khám phá các sản phẩm hot trong danh mục này'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
