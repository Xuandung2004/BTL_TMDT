'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Category } from '@/types';

const PopularCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const result = await response.json();
        
        if (result.success) {
          setCategories(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to fetch categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-12 text-red-500">{error}</div>;
  }

  if (categories.length === 0) {
    return <div className="container mx-auto px-4 py-12">No categories available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Popular Categories</h2>
        <Link href="/categories" className="text-sm font-medium text-gray-900 hover:underline">
          SHOP ALL CATEGORIES
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.link}
            className="group"
          >
            <div className="relative aspect-square rounded-full overflow-hidden bg-gray-100 mb-3">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-center text-sm font-medium">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories; 