'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  FiHome,
  FiGrid,
  FiTag,
  FiShoppingBag,
} from 'react-icons/fi';

import {
  FiMinus,
  FiPlus,
  FiHeart,
  FiShare2,
} from 'react-icons/fi';
import { AiFillStar, AiFillHeart } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { fetchProductById, addToCart } from '@/app/services/api';
import type { Product } from '@/types';

export default function ProductPage() {
  const { id } = useParams() as { id?: string };
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (!id) {
      setError('Không tìm thấy sản phẩm');
      setLoading(false);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const { data } = await fetchProductById(+id);
        if (!data) throw new Error('Không tìm thấy sản phẩm');
        setProduct(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const changeQty = (inc: boolean) => {
    if (!product) return;
    setQuantity((q) =>
      inc ? Math.min(q + 1, product.instock) : Math.max(q - 1, 1)
    );
  };

  const handleAdd = async () => {
    if (!product) return;
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Vui lòng đăng nhập');
      return router.push('/login');
    }
    setIsAdding(true);
    try {
      await addToCart({ productId: product.id, quantity });
      toast.success('Đã thêm vào giỏ hàng');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Lỗi thêm giỏ hàng');
    } finally {
      setIsAdding(false);
    }
  };

  const toggleFav = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Vui lòng đăng nhập');
      return router.push('/login');
    }
    setIsFavorite((f) => !f);
    toast.success(isFavorite ? 'Đã bỏ yêu thích' : 'Đã thêm yêu thích');
  };

  // Loading skeleton
  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white py-12">
          <div className="max-w-5xl mx-auto space-y-8 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-[400px] bg-gray-200 rounded-lg" />
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-6 bg-gray-200 rounded w-1/2" />
                <div className="h-10 bg-gray-200 rounded w-1/3" />
                <div className="h-24 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white flex items-center justify-center py-24">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-2">Lỗi</h2>
            <p className="text-gray-700 mb-4">{error}</p>
            <Link
              href="/"
              className="text-[#FFB629] hover:underline font-medium"
            >
              Quay về trang chủ
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4 space-y-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-gray-600 space-x-2">
  <Link href="/" className="flex items-center gap-1 hover:underline">
    <FiHome /> Trang chủ
  </Link>
  <span>/</span>

  <Link href="/categories" className="flex items-center gap-1 hover:underline">
    <FiGrid  /> Danh mục
  </Link>
  <span>/</span>

  <Link
    href={`/categories/${product.categoryId}`}
    className="flex items-center gap-1 hover:underline"
  >
    <FiTag /> {product.category?.name}
  </Link>
  <span>/</span>

  <span className="flex items-center gap-1 text-gray-800 font-medium">
    <FiShoppingBag /> {product.name}
  </span>
</nav>



          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden border">
              <Image
                src={product.imageUrl!}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <AiFillStar
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-700">
                    ({product.rating})
                  </span>
                </div>
              )}

              {/* Price & stock */}
              <div className="flex items-center justify-between border-y py-4">
                <div>
                  {product.discountPrice ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-red-600">
                        {product.discountPrice.toLocaleString()}₫
                      </span>
                      <span className="text-lg line-through text-gray-500">
                        {product.price.toLocaleString()}₫
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">
                      {product.price.toLocaleString()}₫
                    </span>
                  )}
                </div>
                <div className={`text-sm font-medium ${
                    product.instock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {product.instock > 0
                    ? `Còn ${product.instock}`
                    : 'Hết hàng'}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => changeQty(false)}
                    disabled={quantity <= 1}
                    className="p-2 border rounded disabled:opacity-50"
                  >
                    <FiMinus />
                  </button>
                  <span className="px-4 py-2 border rounded text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => changeQty(true)}
                    disabled={quantity >= product.instock}
                    className="p-2 border rounded disabled:opacity-50"
                  >
                    <FiPlus />
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleAdd}
                    disabled={isAdding || product.instock === 0}
                    className="flex-1 bg-[#FFB629] hover:bg-[#ffa600] text-white py-3 rounded-lg font-medium text-center disabled:opacity-50"
                  >
                    {isAdding
                      ? 'Đang thêm...'
                      : product.instock === 0
                      ? 'Hết hàng'
                      : 'Thêm vào giỏ'
                    }
                  </button>
                  <button
                    onClick={toggleFav}
                    className={`p-3 border rounded-lg ${
                      isFavorite
                        ? 'bg-red-100 border-red-300 text-red-500'
                        : 'hover:bg-gray-50 border-gray-200 text-gray-600'
                    }`}
                  >
                    {isFavorite ? (
                      <AiFillHeart className="w-6 h-6" />
                    ) : (
                      <FiHeart className="w-6 h-6" />
                    )}
                  </button>
                  <button className="p-3 border rounded-lg hover:bg-gray-50 text-gray-600">
                    <FiShare2 className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  Mô tả sản phẩm
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
