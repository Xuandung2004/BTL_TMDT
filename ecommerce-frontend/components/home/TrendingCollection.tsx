'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TrendingCollection = () => {
  const router = useRouter();
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      name: "Áo Sơ Mi Lụa Dài Tay",
      image: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      price: 550000,
      slug: "ao-so-mi-lua-dai-tay"
    },
    {
      id: 2,
      name: "Áo Khoác Bomber Nữ",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      price: 750000,
      slug: "ao-khoac-bomber-nu"
    },
    {
      id: 3,
      name: "Đầm Suông Công Sở",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      price: 650000,
      slug: "dam-suong-cong-so"
    },
    {
      id: 4,
      name: "Set Áo Vest & Quần Âu",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      price: 1250000,
      slug: "set-ao-vest-quan-au"
    },
    {
      id: 5,
      name: "Áo Blazer Dáng Suông",
      image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      price: 850000,
      slug: "ao-blazer-dang-suong"
    },
    {
      id: 6,
      name: "Chân Váy Xếp Ly",
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      price: 450000,
      slug: "chan-vay-xep-ly"
    }
  ];

  const handleLikeProduct = (productId: number) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const navigateToProduct = (slug: string) => {
    router.push(`/product/${slug}`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Bộ Sưu Tập Mới</h2>
        <Link href="/collections" className="text-gray-900 hover:text-[#FFB629] font-medium">
          Xem tất cả
        </Link>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        className="product-slider"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="group relative">
              <div 
                onClick={() => navigateToProduct(product.slug)}
                className="cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikeProduct(product.id);
                      }}
                      className="bg-white p-2 rounded-full shadow-md hover:bg-[#FFB629] hover:text-white transition-colors"
                    >
                      {likedProducts.includes(product.id) ? (
                        <FaHeart size={20} className="text-[#FFB629]" />
                      ) : (
                        <FiHeart size={20} />
                      )}
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToProduct(product.slug);
                      }}
                      className="w-full bg-white text-gray-900 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 hover:bg-[#FFB629] hover:text-white font-medium"
                    >
                      <FiShoppingCart />
                      Xem chi tiết
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-[#FFB629] transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-900 font-semibold">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(product.price)}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingCollection; 