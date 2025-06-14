'use client';

import React, { useEffect, useState } from 'react';
import { fetchProducts, addToCart } from '@/app/services/api';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';

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
    } catch (err) {
      alert("😥 Vui lòng đăng nhập để mua hàng!");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="p-6">
      {/* Tiêu đề và nút xem giỏ hàng */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🛍️ Tất cả sản phẩm</h1>
        <Link
          href="/cart"
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded shadow"
        >
          <FiShoppingCart size={20} />
          Xem giỏ hàng
        </Link>
      </div>

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
        </div>
      )}
    </div>
  );
}
