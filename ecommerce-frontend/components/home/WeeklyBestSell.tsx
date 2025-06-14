'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FiShoppingCart } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const WeeklyBestSell = () => {
  const products = [
    {
      name: "Premium Leather Boots",
      image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      price: 249.99,
      oldPrice: 299.99,
      link: "/product/11"
    },
    {
      name: "Designer Handbag",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
      price: 399.99,
      oldPrice: 459.99,
      link: "/product/12"
    },
    {
      name: "Silk Scarf",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
      price: 79.99,
      oldPrice: 99.99,
      link: "/product/13"
    },
    {
      name: "Vintage Watch",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=689&q=80",
      price: 499.99,
      oldPrice: 599.99,
      link: "/product/14"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Weekly Best Sell</h2>
        <Link href="/best-sellers" className="text-gray-900 hover:text-gray-700 font-medium">
          View All
        </Link>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
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
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="group">
              <div className="relative h-[300px] overflow-hidden rounded-lg mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <button className="w-full bg-white text-gray-900 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 hover:bg-gray-900 hover:text-white font-medium">
                    <FiShoppingCart />
                    Add to Cart
                  </button>
                </div>
              </div>
              <Link href={product.link}>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 font-semibold">${product.price}</span>
                  <span className="text-gray-700 line-through text-sm font-medium">${product.oldPrice}</span>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WeeklyBestSell; 