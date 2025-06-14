'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const WeeklyBestSell = () => {
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      name: "Áo Khoác Bomber Thời Trang",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      price: 650000,
      slug: "ao-khoac-bomber-thoi-trang"
    },
    {
      id: 2,
      name: "Áo Sơ Mi Họa Tiết",
      image: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      price: 450000,
      slug: "ao-so-mi-hoa-tiet"
    },
    {
      id: 3,
      name: "Quần Jean Slim Fit",
      image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      price: 550000,
      slug: "quan-jean-slim-fit"
    },
    {
      id: 4,
      name: "Áo Khoác Dù Unisex",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      price: 480000,
      slug: "ao-khoac-du-unisex"
    },
    {
      id: 5,
      name: "Áo Polo Cotton",
      image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      price: 350000,
      slug: "ao-polo-cotton"
    }
  ];

  const handleLikeProduct = (productId: number) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Sản Phẩm Bán Chạy</h2>
        <Link href="/products" className="text-gray-900 hover:text-[#FFB629] font-medium">
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
              <Link href={`/product/${product.slug}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
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
                    <Link 
                      href={`/product/${product.slug}`}
                      className="w-full bg-white text-gray-900 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 hover:bg-[#FFB629] hover:text-white font-medium"
                    >
                      <FiShoppingCart />
                      Xem chi tiết
                    </Link>
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
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WeeklyBestSell; 