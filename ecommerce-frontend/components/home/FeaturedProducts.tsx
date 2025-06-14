'use client';

import React from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';

const FeaturedProducts = () => {
  const products = [
    {
      name: "Elegant Evening Dress",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=783&q=80",
      price: 199.99,
      link: "/product/5"
    },
    {
      name: "Classic White Shirt",
      image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
      price: 59.99,
      link: "/product/6"
    },
    {
      name: "Casual Sneakers",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      price: 89.99,
      link: "/product/7"
    },
    {
      name: "Designer Sunglasses",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      price: 129.99,
      link: "/product/8"
    },
    {
      name: "Leather Watch",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=689&q=80",
      price: 299.99,
      link: "/product/9"
    },
    {
      name: "Summer Hat",
      image: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
      price: 45.99,
      link: "/product/10"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
        <Link href="/featured" className="text-gray-900 hover:text-gray-700 font-medium">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="group">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  suppressHydrationWarning
                  type="button"
                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-900 hover:text-white transition-colors"
                >
                  <FiHeart size={20} />
                </button>
                <button 
                  suppressHydrationWarning
                  type="button"
                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-900 hover:text-white transition-colors"
                >
                  <FiShoppingCart size={20} />
                </button>
              </div>
            </div>
            <Link href={product.link}>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{product.name}</h3>
              <p className="text-gray-900 font-semibold">${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts; 