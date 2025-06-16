'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { fetchProducts, addToCart } from '@/app/services/api';
import {FiTag, FiHome, FiGrid, FiShoppingCart } from 'react-icons/fi';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetchProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
    }
    setLoading(false);
  };

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart({ productId, quantity: 1 });
      alert("🎉 Đã thêm vào giỏ hàng!");
    } catch {
      alert("😥 Vui lòng đăng nhập để mua hàng!");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <Header />

<<<<<<< Updated upstream
      {/* Danh sách sản phẩm */}
      {loading ? (
        <p>⏳ Đang tải sản phẩm...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <img
                src={product.imageUrl || "/placeholder.png"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 text-sm h-12 overflow-hidden">{product.description}</p>
                <p className="text-blue-600 font-bold text-md">{product.price?.toLocaleString()}₫</p>
                <p className="text-sm text-gray-500">Kho: {product.stock}</p>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="w-full mt-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                  🛒 Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
=======
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-600 mb-4 space-x-2">
          <Link href="/" className="hover:underline flex items-center gap-1">
            <FiHome /> Trang chủ
          </Link>
          <span>/</span>
          <span className="flex items-center gap-1 text-gray-800 font-medium">
            <FiGrid /> Sản phẩm
          </span>
>>>>>>> Stashed changes
        </div>

        {/* Title + Cart */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">🛍️ Tất cả sản phẩm</h1>
          <Link
            href="/cart"
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded shadow"
          >
            <FiShoppingCart size={20} /> Giỏ hàng
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="space-y-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-2xl" />
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-5 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          // Empty state card
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow p-8 mx-auto max-w-md">
            <FiShoppingCart className="text-6xl text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Oops, chưa có sản phẩm!
            </h2>
            <p className="text-gray-500 mb-6 text-center">
              Chúng tôi đang cập nhật sản phẩm mới. Quay lại sau nhé!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full"
            >
              Quay về trang chủ
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition"
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative h-48">
                    <img
                      src={product.imageUrl || '/placeholder.png'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
                  </div>
                  <div className="p-4 space-y-1">
                    <h2 className="text-lg font-semibold text-gray-800 truncate">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-2 h-[2.5rem]">
                      {product.description}
                    </p>
                    <p className="text-blue-600 font-bold">
                      {product.price?.toLocaleString()}₫
                    </p>
                    <p className="text-sm text-gray-500">
                      Kho: {product.stock}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-lg opacity-0 group-hover:opacity-100 transition"
                >
                  🛒 Thêm vào giỏ
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
