'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
<<<<<<< Updated upstream
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductFilters from '@/components/products/ProductFilters'; 
=======
import { useSearchParams, useRouter } from 'next/navigation';
import {
  FiSearch,
  FiShoppingCart,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { fetchProducts, addToCart, fetchCart } from '@/app/services/api';
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
      // Lọc theo brands nếu chọn
      if (filters.brands.length > 0) {
        filtered = filtered.filter((p: { category: { name: any; }; brand: any; }) => filters.brands.includes(p?.category?.name || '') || filters.brands.includes(p?.brand || ''));
      }

      // Lọc theo khoảng giá
      filtered = filtered.filter((p: { price: number; }) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

      // Lọc theo đánh giá
      if (filters.ratings.length > 0) {
        filtered = filtered.filter((p: { rating: number; }) => filters.ratings.includes(Math.floor(p.rating) || 0));
      }

      // Sắp xếp
      filtered = filtered.sort((a: { price: number; }, b: { price: number; }) => {
  switch (filters.sortBy) {
    case 'price-asc':
      return a.price - b.price;
    case 'price-desc':
      return b.price - a.price;
    default:
      return 0;
  }
});

=======
      // sort
      filtered.sort((a: any, b: any) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return b.name.localeCompare(a.name);
      });
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Bộ lọc bên trái */}
        <aside className="lg:w-80 bg-white rounded-lg shadow-md p-6 sticky top-20 self-start">
          <ProductFilters onFilterChange={setFilters} />
        </aside>

        {/* Phần kết quả tìm kiếm */}
        <section className="flex-1">
          <h1 className="text-4xl font-extrabold text-orange-700 mb-8 select-none">
            Kết quả tìm kiếm: <span className="text-orange-900">{searchTerm}</span>
          </h1>

          {/* Thanh tìm kiếm */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex max-w-4xl mx-auto mb-8 rounded-lg shadow-lg overflow-hidden border border-orange-300"
            role="search"
            aria-label="Tìm kiếm sản phẩm"
=======
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
>>>>>>> Stashed changes
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
                <FiSearch size={20} />
              </button>
            </form>

<<<<<<< Updated upstream
          {/* Loading, error, empty */}
          {loading && <p className="text-center text-gray-600 text-xl">Đang tải kết quả...</p>}
          {error && <p className="text-center text-red-600 text-xl">{error}</p>}
          {!loading && !error && products.length === 0 && (
            <p className="text-center text-gray-600 text-xl">
              Không tìm thấy sản phẩm phù hợp với từ khóa &ldquo;
              <mark className="bg-orange-200 px-2 rounded font-semibold">{searchTerm}</mark>&rdquo;.
            </p>
          )}

          {/* Sản phẩm */}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:-translate-y-3 hover:shadow-2xl transition cursor-pointer flex flex-col"
                >
                  <Link href={`/products/${product.id}`} className="block flex-grow group relative">
                    <img
                      src={product.imageUrl || '/placeholder.png'}
                      alt={product.name}
                      loading="lazy"
                      className="object-cover w-full h-60 rounded-t-3xl transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="p-6 space-y-3">
                      <h2 className="text-xl font-semibold text-gray-900 truncate">{product.name}</h2>
                      <p className="text-gray-600 text-sm line-clamp-2 min-h-[3rem]">{product.description || 'Không có mô tả'}</p>
                      <p className="text-2xl font-extrabold text-orange-600">{product.price?.toLocaleString()}₫</p>
                      <p className="text-sm text-gray-400">Tồn kho: {product.stock}</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded-b-3xl transition flex items-center justify-center gap-2"
                    aria-label={`Thêm ${product.name} vào giỏ hàng`}
                  >
                    <ShoppingCartIcon fontSize="medium" />
                    <span>Thêm vào giỏ</span>
                  </button>
                </div>
              ))}
=======
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
>>>>>>> Stashed changes
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
