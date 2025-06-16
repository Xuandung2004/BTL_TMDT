'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  FiSearch,
  FiShoppingCart,
  FiArrowLeft,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { fetchProducts, addToCart, fetchCart } from '@/app/services/api';

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const initialSort = (searchParams.get('sort') || 'name-asc') as SortOption;

  const [searchTerm, setSearchTerm] = useState(query);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Load cart count
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCart();
        const totalQty = res.data.reduce(
          (sum: number, item: any) => sum + (item.quantity ?? 1),
          0
        );
        setCartCount(totalQty);
      } catch {
        setCartCount(0);
      }
    })();
  }, []);

  // Fetch & filter products
  const fetchSearchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchProducts();
      let filtered = res.data.filter((p: any) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description || '').toLowerCase().includes(searchTerm.toLowerCase())
      );

      // sort
      filtered.sort((a: any, b: any) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return b.name.localeCompare(a.name);
      });

      setProducts(filtered);
    } catch {
      setError('Lỗi khi tải kết quả. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setProducts([]);
      setError('Vui lòng nhập từ khóa tìm kiếm');
      return;
    }
    fetchSearchResults();
  }, [searchTerm, sortBy]);

  // Handlers
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}&sort=${sortBy}`);
  };

  const handleAddToCart = async (id: number) => {
    try {
      await addToCart({ productId: id, quantity: 1 });
      alert('Đã thêm vào giỏ hàng!');
      // Optionally update badge:
      setCartCount((c) => c + 1);
    } catch {
      alert('Vui lòng đăng nhập để mua hàng!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FFB629]">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            LazyShop
          </Link>
          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <nav
            className={`flex-1 md:flex md:items-center md:justify-between transition-all ${
              menuOpen ? 'block mt-4' : 'hidden'
            } md:block`}
          >
            <form
              onSubmit={handleSearchSubmit}
              className="relative w-full max-w-md mx-auto md:mx-0"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm sản phẩm..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label="Tìm kiếm"
              >
                <FiSearch size={25} />
              </button>
            </form>

            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link
                href="/categories"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Danh mục
              </Link>
              <Link
                href="/product"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Sản phẩm
              </Link>
              <Link
                href="/cart"
                className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full"
                aria-label="Giỏ hàng"
              >
                <FiShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-orange-700 mb-6">
          Kết quả tìm kiếm: <span className="text-orange-900">{searchTerm}</span>
        </h1>

        {/* Sort select */}
        <div className="flex justify-end mb-6">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option value="name-asc">Tên A → Z</option>
            <option value="name-desc">Tên Z → A</option>
            <option value="price-asc">Giá thấp → cao</option>
            <option value="price-desc">Giá cao → thấp</option>
          </select>
        </div>

        {/* States */}
        {loading && (
          <p className="text-center text-gray-600 text-lg">Đang tải kết quả...</p>
        )}
        {error && (
          <p className="text-center text-red-600 text-lg">{error}</p>
        )}
        {!loading && !error && products.length === 0 && (
          <div className="text-center text-gray-600 text-lg">
            Không tìm thấy sản phẩm với từ khóa&nbsp;
            <mark className="bg-orange-200 px-2 rounded font-semibold">
              {searchTerm}
            </mark>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {!loading &&
            !error &&
            products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition"
              >
                <Link
                  href={`/product/${p.id}`}
                  className="block flex-grow group relative"
                >
                  <img
                    src={p.imageUrl || '/placeholder.png'}
                    alt={p.name}
                    loading="lazy"
                    className="object-cover w-full h-48 rounded-t-3xl group-hover:scale-105 transform transition"
                  />
                  <div className="p-4 space-y-2">
                    <h2 className="font-semibold text-gray-900 truncate">
                      {p.name}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {p.description || 'Không có mô tả'}
                    </p>
                    <p className="text-xl font-bold text-orange-600">
                      {p.price.toLocaleString()}₫
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => handleAddToCart(p.id)}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-b-3xl flex items-center justify-center gap-2 transition"
                >
                  <FiShoppingCart /> Thêm vào giỏ
                </button>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
