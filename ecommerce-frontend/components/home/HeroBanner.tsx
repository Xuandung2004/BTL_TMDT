'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroBanner = () => {
  return (
    <div className="relative bg-orange-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-16">
          <div>
            <h1 className="text-5xl font-bold mb-4 text-gray-900">Cardigan</h1>
            <p className="text-gray-900 text-lg mb-8">
              Discover our latest collection of comfortable and stylish cardigans perfect for any occasion.
            </p>
            <Link
              href="/products/cardigan"
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Shop Now
            </Link>
          </div>
          <div className="relative h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=705&q=80"
              alt="Cardigan Collection"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner; 